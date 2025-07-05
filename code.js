"use strict";
// Full Updated code.js with Bulk Movie Apply, Safe Type Checking
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
figma.showUI(__html__, { width: 400, height: 600 });
figma.ui.onmessage = function (msg) { return __awaiter(void 0, void 0, void 0, function* () {
    if (msg.type === 'fill-data') {
        const movie = msg.data;
        const selection = figma.currentPage.selection[0];
        if (!selection || selection.type !== 'FRAME' && selection.type !== 'GROUP' && selection.type !== 'INSTANCE' && selection.type !== 'COMPONENT') {
            figma.notify("Please select a valid parent frame.");
            return;
        }
        yield applyMovieToChildren(selection, movie);
        figma.notify("Movie data applied successfully!");
    }
    if (msg.type === 'bulk-fill') {
        const movies = msg.data;
        const rail = figma.currentPage.selection[0];
        if (!rail || !hasChildren(rail)) {
            figma.notify("Please select a valid rail frame, group, component, or instance.");
            return;
        }
        const itemFrames = rail.children.filter(function (n) { return n.type === "FRAME"; });
        const fillCount = Math.min(itemFrames.length, movies.length);

for (let i = 0; i < fillCount; i++) {
    yield applyMovieToChildren(itemFrames[i], movies[i]);
}

figma.notify(`Applied ${fillCount} movie(s) to ${itemFrames.length} frame(s).`);

    }
}); };
function hasChildren(node) {
    return (node.type === "FRAME" ||
        node.type === "GROUP" ||
        node.type === "INSTANCE" ||
        node.type === "COMPONENT");
}
function applyMovieToChildren(parent, movie) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!parent || !("children" in parent)) return;

        for (const node of parent.children) {

           const allowedNames = ["2:3", "16:9", "1:1", "7:2", "3:1"];

for (const node of parent.children) {
    if (node.type === "RECTANGLE" || node.type === "FRAME" || node.type === "INSTANCE" || node.type === "COMPONENT") {
        const nodeName = node.name.trim();
        if (allowedNames.includes(nodeName) && movie.Images && movie.Images[nodeName]) {
            const imageUrl = movie.Images[nodeName];
            console.log(`🖼️ Applying image to rectangle ${nodeName}:`, imageUrl);

            if (imageUrl) {
                try {
                    const imageBytes = yield fetch(imageUrl).then(res => res.arrayBuffer());
                    const imageHash = figma.createImage(new Uint8Array(imageBytes)).hash;
                    const fills = [{
                        type: "IMAGE",
                        scaleMode: "FILL",
                        imageHash
                    }];
                    node.fills = fills;
                    console.log(`✅ Image applied to rectangle ${nodeName}`);
                } catch (err) {
                    console.log(`❌ Image load error for ${nodeName}:`, err);
                }
            }
        }
    }
}


            if (node.type === "TEXT") {
                try {
                    yield figma.loadFontAsync(node.fontName);
                    if (node.name === "Title" && movie.Title) {
                        node.characters = movie.Title;
                    }
                    if (node.name === "Description" && movie.Description) {
                        node.characters = movie.Description;
                    }
                    if (node.name === "Tag" && movie.Tag) {
                        node.characters = movie.Tag;
                    }
                    if (node.name === "Genres" && Array.isArray(movie.genres)) {
                        node.characters = movie.genres.join(" · ");
                    }
                    if (node.name === "Language" && Array.isArray(movie.Language)) {
                        node.characters = movie.Language.join(" · ");
                    }
                    if (node.name === "Rating" && movie.Rating) {
                        node.characters = movie.Rating;
                    }
                } catch (err) {
                    console.log(`❌ Font load error for ${node.name}:`, err);
                }
            }

            if (hasChildren(node)) {
                applyMovieToChildren(node, movie);
            }
        }
    });
}
