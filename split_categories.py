import re

with open('index.html', 'r', encoding='utf-8') as f:
    text = f.read()

def get_block(text, start_str, end_tag):
    start = text.find(start_str)
    if start == -1: return None, 0, 0
    
    # Simple nested tag matcher
    pos = start + len(start_str)
    depth = 1
    
    # We are matching tags like <div
    open_tag = f"<{start_str.split(' ')[0][1:]}"
    
    while depth > 0 and pos < len(text):
        next_open = text.find(open_tag, pos)
        next_close = text.find(end_tag, pos)
        
        if next_close == -1:
            break
            
        # We need to ensure we're matching the actual open tag, not just a substring
        # e.g., <div vs <divider
        if next_open != -1 and text[next_open:next_open+len(open_tag)+1] in [f'{open_tag} ', f'{open_tag}>']:
            if next_open < next_close:
                depth += 1
                pos = next_open + len(open_tag)
                continue
                
        depth -= 1
        pos = next_close + len(end_tag)
            
    return text[start:pos], start, pos

blocks_to_dup = [
    ('<div id="main-category-selection"', '</div>', 'main-category-selection'),
    ('<div id="hair-sub-categories"', '</div>', 'hair-sub-categories'),
    ('<div id="beauty-sub-categories"', '</div>', 'beauty-sub-categories')
]

for start_str, end_tag, id_name in blocks_to_dup:
    block, start, end = get_block(text, start_str, end_tag)
    if not block: continue
    
    ny_block = block.replace(f'id="{id_name}"', f'id="{id_name}-ny"')
    dt_block = block.replace(f'id="{id_name}"', f'id="{id_name}-dt"')
    
    text = text[:start] + f"<!-- NY VERSION: {id_name} -->\n" + ny_block + "\n\n" + f"<!-- DT VERSION: {id_name} -->\n" + dt_block + text[end:]

service_block, start, end = get_block(text, '<section id="our-services"', '</section>')
if service_block:
    ny_services = service_block.replace('id="our-services"', 'id="our-services-ny"')
    dt_services = service_block.replace('id="our-services"', 'id="our-services-dt" style="display:none;"')
    dt_services = dt_services.replace('<h2>Services</h2>', '<h2>Services (Downtown)</h2>')
    text = text[:start] + ny_services + "\n\n" + dt_services + text[end:]

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(text)

print("Split completed successfully")
