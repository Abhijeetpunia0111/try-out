// Full Updated code.ts with Bulk Movie Apply, Safe Type Checking

figma.showUI(__html__, { width: 400, height: 600 });

figma.ui.onmessage = async (msg) => {
  if (msg.type === 'fill-data') {
    const movie = msg.data;

    const selection = figma.currentPage.selection[0];
    if (!selection || selection.type !== 'FRAME') {
      figma.notify("Please select a valid parent frame.");
      return;
    }

    applyMovieToChildren(selection, movie);
    figma.notify("Movie data applied successfully!");
  }

  if (msg.type === 'bulk-fill') {
    const movies = msg.data;
    const rail = figma.currentPage.selection[0];

    if (!rail || !hasChildren(rail)) {
      figma.notify("Please select a valid rail frame, group, component, or instance.");
      return;
    }

    const itemFrames = rail.children.filter((n): n is FrameNode => n.type === "FRAME");

    if (itemFrames.length < movies.length) {
      figma.notify("Not enough child frames to apply all movies.");
      return;
    }

    for (let i = 0; i < movies.length; i++) {
      applyMovieToChildren(itemFrames[i], movies[i]);
    }

    figma.notify("Bulk movie data applied!");
  }
};

function hasChildren(node: SceneNode): node is FrameNode | GroupNode | InstanceNode | ComponentNode {
  return (
    node.type === "FRAME" ||
    node.type === "GROUP" ||
    node.type === "INSTANCE" ||
    node.type === "COMPONENT"
  );
}

async function applyMovieToChildren(parent: FrameNode | GroupNode | InstanceNode | ComponentNode, movie: any) {
  for (const node of parent.children) {
    if (node.type === "FRAME" && node.name in movie.Images) {
      const imageUrl = movie.Images[node.name];
      if (imageUrl) {
        try {
          const imageBytes = await fetch(imageUrl).then(res => res.arrayBuffer());
          const imageHash = figma.createImage(new Uint8Array(imageBytes)).hash;

          const shape = node.findOne(n => n.type === "RECTANGLE") as RectangleNode | null;

          if (shape && "fills" in shape && Array.isArray(shape.fills)) {
            const fills: ImagePaint[] = [{
              type: "IMAGE",
              scaleMode: "FILL",
              imageHash
            }];
            shape.fills = fills;
          }
        } catch (err) {
          console.log("Image load error:", err);
        }
      }
    }

    if (node.type === "TEXT") {
      try {
        await figma.loadFontAsync(node.fontName as FontName);

        if (node.name === "Title" && movie.Title) {
          node.characters = movie.Title;
        }

        if (node.name === "Description" && movie.Description) {
          node.characters = movie.Description;
        }

        if (node.name === "Genres" && Array.isArray(movie.genres)) {
          node.characters = movie.genres.join(" - ");
        }

        if (node.name === "Rating" && movie.Rating) {
          node.characters = movie.Rating;
        }

      } catch (err) {
        console.log(`❌ Font load error for ${node.name}:`, err);
      }
    }

    // Recursively check deeper children
    if (hasChildren(node)) {
      applyMovieToChildren(node, movie);
    }
  }
}
