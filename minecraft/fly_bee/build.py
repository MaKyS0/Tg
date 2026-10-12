"""Builds the "Fly Bee" Minecraft Bedrock resource pack: a fly model that replaces minecraft:bee.

    python minecraft/fly_bee/build.py

Writes resource_pack/ (geometry, animations, render controller, entity override, textures, lang,
manifest) and FlyBee.mcpack (double-click it on Windows/Android/iOS to import into Minecraft).
Needs Pillow (pip install pillow).
"""
import json, os, zipfile
from PIL import Image, ImageDraw

HERE = os.path.dirname(os.path.abspath(__file__))
RP = os.path.join(HERE, "resource_pack")
TW = TH = 64

# ---------------------------------------------------------------- model
# Pixels; entity faces -Z, so the head is at negative Z. Box-UV: see paint_box().
# name: (parent, pivot, [(origin, size, uv)])
BONES = {
    "body": (None, [0, 5, 0], []),
    "thorax": ("body", [0, 7, 0], [([-3, 5, -3], [6, 5, 6], [0, 0])]),
    "abdomen": ("body", [0, 8, 3], [([-2.5, 4.5, 3], [5, 5, 6], [0, 11])]),
    "head": ("body", [0, 7, -3], [([-2.5, 5, -7], [5, 5, 4], [24, 0])]),
    "eye_left": ("head", [0, 7, -5], [([0.5, 5, -8], [3, 5, 3], [0, 22])]),
    "eye_right": ("head", [0, 7, -5], [([-3.5, 5, -8], [3, 5, 3], [18, 22])]),
    "proboscis": ("head", [0, 5, -7], [([-0.5, 3, -8.5], [1, 2, 2], [42, 0])]),
    "wing_left": ("body", [1.5, 10, 0], [([1.5, 10, -1], [7, 0.5, 5], [0, 30])]),
    "wing_right": ("body", [-1.5, 10, 0], [([-8.5, 10, -1], [7, 0.5, 5], [24, 30])]),
}
for side, x in (("l", 2.5), ("r", -3.5)):
    for i, z in enumerate((-2.5, -0.5, 1.5), 1):
        BONES[f"leg_{side}{i}"] = ("body", [x + 0.5, 5, z + 0.5], [([x, 0, z], [1, 5, 1], [0, 37])])


def geometry():
    bones = []
    for name, (parent, pivot, cubes) in BONES.items():
        b = {"name": name, "pivot": pivot}
        if parent:
            b["parent"] = parent
        if cubes:
            b["cubes"] = [{"origin": o, "size": s, "uv": u} for o, s, u in cubes]
        bones.append(b)
    return {
        "format_version": "1.12.0",
        "minecraft:geometry": [{
            "description": {
                "identifier": "geometry.fly", "texture_width": TW, "texture_height": TH,
                "visible_bounds_width": 2, "visible_bounds_height": 1.5, "visible_bounds_offset": [0, 0.5, 0],
            },
            "bones": bones,
        }],
    }


def animations():
    t = "query.life_time"
    amp = "(query.is_on_ground ? 0.15 : 1.0)"
    legs = {}
    for i, side in enumerate(("l", "r")):
        for j in (1, 2, 3):
            legs[f"leg_{side}{j}"] = {"rotation": [f"math.sin({t}*220+{j * 70 + i * 90})*8", 0, 0]}
    return {
        "format_version": "1.8.0",
        "animations": {
            "animation.fly.wings": {"loop": True, "bones": {
                "wing_left": {"rotation": [0, 0, f"({amp})*math.sin({t}*3600)*35+10"]},
                "wing_right": {"rotation": [0, 0, f"-(({amp})*math.sin({t}*3600)*35+10)"]},
            }},
            "animation.fly.hover": {"loop": True, "bones": {
                "body": {"position": [0, f"(query.is_on_ground ? 0 : math.sin({t}*180)*0.6)", 0]},
                "abdomen": {"rotation": [f"math.sin({t}*150)*4", 0, 0]},
                "proboscis": {"rotation": [f"math.sin({t}*300)*6", 0, 0]},
                **legs,
            }},
        },
    }


def render_controller():
    return {
        "format_version": "1.8.0",
        "render_controllers": {"controller.render.fly": {
            "arrays": {"textures": {"Array.skins": ["Texture.default", "Texture.angry"]}},
            "geometry": "Geometry.default",
            "materials": [{"*": "Material.default"}],
            "textures": ["Array.skins[query.is_angry]"],
        }},
    }


def entity():
    # Same identifier as the vanilla bee -> this definition replaces it everywhere the pack is active.
    return {
        "format_version": "1.10.0",
        "minecraft:client_entity": {"description": {
            "identifier": "minecraft:bee",
            "materials": {"default": "entity_alpha"},
            "textures": {"default": "textures/entity/fly/fly", "angry": "textures/entity/fly/fly_angry"},
            "geometry": {"default": "geometry.fly"},
            "animations": {"wings": "animation.fly.wings", "hover": "animation.fly.hover"},
            "scripts": {"scale": "query.is_baby ? 0.6 : 1.0", "animate": ["wings", "hover"]},
            "render_controllers": ["controller.render.fly"],
            "spawn_egg": {"base_color": "#25282b", "overlay_color": "#b3201f"},
        }},
    }


# ---------------------------------------------------------------- texture
def paint_box(px, uv, size, faces):
    """Fill the six faces of a Bedrock box-UV cube. faces: dict face -> fn(x, y, w, h) painting that rect."""
    u, v = uv
    w, h, d = (int(s) if s >= 1 else 1 for s in (size[0], size[1], size[2]))
    if size[1] < 1:
        h = 1
    rects = {
        "up": (u + d, v, w, d), "down": (u + d + w, v, w, d),
        "east": (u, v + d, d, h), "north": (u + d, v + d, w, h),
        "west": (u + d + w, v + d, d, h), "south": (u + 2 * d + w, v + d, w, h),
    }
    for f, r in rects.items():
        faces.get(f, faces["all"])(px, *r)


def fill(color):
    def fn(px, x, y, w, h):
        for i in range(x, x + w):
            for j in range(y, y + h):
                px[i, j] = color
    return fn


def striped(c1, c2, period=3):
    def fn(px, x, y, w, h):
        for i in range(x, x + w):
            for j in range(y, y + h):
                px[i, j] = c1 if ((i + j * 0) // period) % 2 == 0 else c2
    return fn


def facets(base, light, hi):
    """Compound-eye look: checkerboard of two reds plus a specular highlight."""
    def fn(px, x, y, w, h):
        for i in range(x, x + w):
            for j in range(y, y + h):
                px[i, j] = light if (i + j) % 2 == 0 else base
        px[x + 1 if w > 1 else x, y + 1 if h > 1 else y] = hi
    return fn


def texture(angry=False):
    img = Image.new("RGBA", (TW, TH), (0, 0, 0, 0))
    px = img.load()
    body = (62, 38, 38, 255) if angry else (38, 42, 46, 255)
    body2 = (88, 40, 36, 255) if angry else (58, 64, 70, 255)
    dark = (24, 20, 20, 255) if angry else (22, 24, 26, 255)
    eye = (255, 120, 20, 255) if angry else (179, 32, 31, 255)
    eye_l = (255, 190, 60, 255) if angry else (214, 66, 58, 255)
    hi = (255, 255, 235, 255)
    wing = (170, 190, 205, 90)
    vein = (70, 80, 90, 190)

    # thorax: dark with a lighter back stripe (top face)
    paint_box(px, (0, 0), (6, 5, 6), {"all": fill(body), "up": striped(body2, body, 2)})
    paint_box(px, (24, 0), (5, 5, 4), {"all": fill(body2)})              # head
    paint_box(px, (0, 11), (5, 5, 6), {"all": striped(dark, body2, 2)})  # abdomen bands
    for uv in ((0, 22), (18, 22)):                                       # eyes
        paint_box(px, uv, (3, 5, 3), {"all": facets(eye, eye_l, hi)})
    paint_box(px, (42, 0), (1, 2, 2), {"all": fill(dark)})               # proboscis
    for uv in ((0, 30), (24, 30)):                                       # wings
        paint_box(px, uv, (7, 1, 5), {"all": fill(wing)})
        u, v = uv
        for k in range(5, 12):                                           # wing veins on top/bottom faces
            for j in range(5):
                if k in (5, 8, 11) or j == 2:
                    px[u + k, v + j] = vein
                    px[u + k + 7, v + j] = vein
    paint_box(px, (0, 37), (1, 5, 1), {"all": fill(dark)})               # legs
    return img


def pack_icon():
    img = Image.new("RGBA", (64, 64), (46, 60, 40, 255))
    d = ImageDraw.Draw(img)
    d.ellipse((24, 26, 44, 44), fill=(38, 42, 46, 255))     # abdomen
    d.ellipse((18, 22, 32, 36), fill=(58, 64, 70, 255))     # thorax
    d.ellipse((10, 24, 22, 36), fill=(179, 32, 31, 255))    # eye
    d.ellipse((13, 26, 16, 29), fill=(255, 255, 235, 255))
    d.ellipse((20, 8, 36, 24), fill=(170, 190, 205, 160))   # wing
    return img


# ---------------------------------------------------------------- pack
MANIFEST = {
    "format_version": 2,
    "header": {
        "name": "Fly Bee — Муха вместо пчелы",
        "description": "Replaces the bee model with a fly (compound eyes, flapping wings). Муха вместо пчелы.",
        "uuid": "6f1d1c52-2b7d-4e43-9b7a-3f8e6a0c1d21",
        "version": [1, 0, 0],
        "min_engine_version": [1, 20, 0],
    },
    "modules": [{"type": "resources", "uuid": "a3c0e5b8-7d34-4b0e-8f5a-52d1c7e9b604", "version": [1, 0, 0],
                 "description": "Fly model"}],
}

LANG = {
    "en_US": "entity.bee.name=Fly\nitem.spawn_egg.entity.bee.name=Fly Spawn Egg\n",
    "ru_RU": "entity.bee.name=Муха\nitem.spawn_egg.entity.bee.name=Яйцо призыва мухи\n",
}


def write_json(rel, data):
    path = os.path.join(RP, rel)
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2, ensure_ascii=False)
        f.write("\n")


def main():
    write_json("manifest.json", MANIFEST)
    write_json("models/entity/fly.geo.json", geometry())
    write_json("animations/fly.animation.json", animations())
    write_json("render_controllers/fly.render_controllers.json", render_controller())
    write_json("entity/bee.entity.json", entity())
    os.makedirs(os.path.join(RP, "textures/entity/fly"), exist_ok=True)
    texture().save(os.path.join(RP, "textures/entity/fly/fly.png"))
    texture(angry=True).save(os.path.join(RP, "textures/entity/fly/fly_angry.png"))
    pack_icon().save(os.path.join(RP, "pack_icon.png"))
    os.makedirs(os.path.join(RP, "texts"), exist_ok=True)
    for lang, text in LANG.items():
        with open(os.path.join(RP, "texts", lang + ".lang"), "w", encoding="utf-8") as f:
            f.write(text)
    write_json("texts/languages.json", list(LANG))

    out = os.path.join(HERE, "FlyBee.mcpack")
    with zipfile.ZipFile(out, "w", zipfile.ZIP_DEFLATED) as z:
        for root, _, files in os.walk(RP):
            for fn in sorted(files):
                full = os.path.join(root, fn)
                z.write(full, os.path.relpath(full, RP))
    print("built", out)


if __name__ == "__main__":
    main()
