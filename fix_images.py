from PIL import Image

def process_image(in_path, out_path):
    img = Image.open(in_path).convert("RGBA")
    data = img.getdata()
    new_data = []

    for item in data:
        r, g, b, a = item
        # Calculate how close to white
        lightness = max(r, g, b)
        if lightness > 240:
            # Map lightness 240->255 to alpha 255->0
            alpha = int(max(0, 255 - (lightness - 240) * (255 / 15.0)))
            new_data.append((r, g, b, alpha))
        else:
            new_data.append((r, g, b, 255))

    img.putdata(new_data)
    img.save(out_path, "PNG")

process_image("inspiration pics/glitter.png", "public/images/glitter.png")
process_image("inspiration pics/curve left.png", "public/images/curve_left.png")
process_image("inspiration pics/curve right.png", "public/images/curve_right.png")
print("Done fixing images")
