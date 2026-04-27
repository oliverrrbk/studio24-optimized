from PIL import Image

def process_image(in_path, out_path):
    img = Image.open(in_path).convert("RGBA")
    data = img.getdata()
    new_data = []

    for item in data:
        r, g, b, a = item
        # Fast distance from white
        dist = ((255 - r)**2 + (255 - g)**2 + (255 - b)**2)**0.5
        
        if dist < 10:
            # practically white
            new_data.append((255, 255, 255, 0))
        elif dist < 100:
            # slightly anti-aliased edge
            # Alpha based on distance from white
            alpha = int((dist / 100.0) * 255)
            # Keeping original RGB
            new_data.append((r, g, b, alpha))
        else:
            new_data.append((r, g, b, 255))

    img.putdata(new_data)
    img.save(out_path, "PNG")

process_image("inspiration pics/glitter.png", "public/images/glitter.png")
process_image("inspiration pics/curve left.png", "public/images/curve_left.png")
process_image("inspiration pics/curve right.png", "public/images/curve_right.png")
print("Done")
