import math
points = 16
rx = 45
ry = 55
cx = 50
cy = 60
bow_depth = 4

path = []
for i in range(points):
    angle1 = i * 2 * math.pi / points
    angle2 = (i + 1) * 2 * math.pi / points
    
    # Start point of the bow
    x1 = cx + rx * math.sin(angle1)
    y1 = cy - ry * math.cos(angle1)
    
    # End point of the bow
    x2 = cx + rx * math.sin(angle2)
    y2 = cy - ry * math.cos(angle2)
    
    # Control point (pushed outwards for the bow effect)
    mid_angle = (angle1 + angle2) / 2
    cp_x = cx + (rx + bow_depth) * math.sin(mid_angle)
    cp_y = cy - (ry + bow_depth) * math.cos(mid_angle)
    
    if i == 0:
        path.append(f"M {x1:.1f} {y1:.1f}")
    
    path.append(f"Q {cp_x:.1f} {cp_y:.1f} {x2:.1f} {y2:.1f}")

print(" ".join(path))
