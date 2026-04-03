import fs from 'fs';

async function fetchFigma() {
  const token = process.env.FIGMA_TOKEN;
  if (!token) {
    console.error('Defina a variável de ambiente FIGMA_TOKEN (token pessoal do Figma).');
    process.exit(1);
  }
  const url = "https://api.figma.com/v1/files/d6cS6vlKHQNKT6dvMfOOEG/nodes?ids=48:146";
  
  const response = await fetch(url, { headers: { 'X-Figma-Token': token } });
  const data = await response.json();
  
  const root = data.nodes['48:146'].document;
  
  function clean(node) {
    if (!node) return null;
    const { 
      id, name, type, children, characters, layoutMode, primaryAxisSizingMode, counterAxisSizingMode, 
      primaryAxisAlignItems, counterAxisAlignItems, paddingLeft, paddingRight, paddingTop, paddingBottom, 
      itemSpacing, fills, strokes, strokeWeight, cornerRadius, style, absoluteBoundingBox,
      absoluteRenderBounds, blendMode, constraints, layoutAlign, layoutGrow, size
    } = node;
    const cleanNode = { id, name, type };
    if (characters) cleanNode.characters = characters;
    if (layoutMode) cleanNode.layoutMode = layoutMode;
    if (primaryAxisSizingMode) cleanNode.primaryAxisSizingMode = primaryAxisSizingMode;
    if (counterAxisSizingMode) cleanNode.counterAxisSizingMode = counterAxisSizingMode;
    if (primaryAxisAlignItems) cleanNode.primaryAxisAlignItems = primaryAxisAlignItems;
    if (counterAxisAlignItems) cleanNode.counterAxisAlignItems = counterAxisAlignItems;
    if (paddingLeft !== undefined) cleanNode.paddingLeft = paddingLeft;
    if (paddingRight !== undefined) cleanNode.paddingRight = paddingRight;
    if (paddingTop !== undefined) cleanNode.paddingTop = paddingTop;
    if (paddingBottom !== undefined) cleanNode.paddingBottom = paddingBottom;
    if (itemSpacing !== undefined) cleanNode.itemSpacing = itemSpacing;
    if (fills && fills.length > 0) cleanNode.fills = fills;
    if (strokes && strokes.length > 0) cleanNode.strokes = strokes;
    if (strokeWeight !== undefined) cleanNode.strokeWeight = strokeWeight;
    if (cornerRadius !== undefined) cleanNode.cornerRadius = cornerRadius;
    if (style) cleanNode.style = style;
    if (absoluteBoundingBox) cleanNode.absoluteBoundingBox = absoluteBoundingBox;
    if (size) cleanNode.size = size;
    if (children) cleanNode.children = children.map(clean);
    return cleanNode;
  }
  
  fs.writeFileSync('figma_component_48_146.json', JSON.stringify(clean(root), null, 2));
  console.log("Written to figma_component_48_146.json");
}

fetchFigma();
