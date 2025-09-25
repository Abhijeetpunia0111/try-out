"use strict";
// Full Updated code.ts with Bulk Movie Apply, Safe Type Checking
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
figma.ui.onmessage = (msg) => __awaiter(void 0, void 0, void 0, function* () {
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
        const itemFrames = rail.children.filter((n) => n.type === "FRAME" ||
            n.type === "GROUP" ||
            n.type === "INSTANCE" ||
            n.type === "COMPONENT");
        // if (itemFrames.length < movies.length) {
        //   figma.notify("Not enough child frames to apply all movies.");
        //   return;
        // }
        for (let i = 0; i < movies.length; i++) {
            applyMovieToChildren(itemFrames[i], movies[i]);
        }
        figma.notify("Bulk movie data applied!");
    }
});
function hasChildren(node) {
    return (node.type === "FRAME" ||
        node.type === "GROUP" ||
        node.type === "INSTANCE" ||
        node.type === "COMPONENT");
}
function applyMovieToChildren(parent, movie) {
    return __awaiter(this, void 0, void 0, function* () {
        for (const node of parent.children) {
            console.log(`Visiting node: ${node.name} of type ${node.type}`);
            console.log(`Visiting movie: ${movie["2:3"]} of type ${movie["2:3"]}`, movie.Images['2:3']);
            if (node.type === "FRAME" ||
                node.type === "GROUP" ||
                node.type === "INSTANCE" ||
                node.type === "RECTANGLE" ||
                node.type === "COMPONENT") {
                const nodeName = node.name.trim();
                console.log(`Visiting movie: `, movie.Images[nodeName]);
                const imageUrl = movie["Images"] ? movie["Images"][nodeName] : null;
                console.log(`Processing node: ${node.name} with image URL: ${imageUrl}`);
                if (imageUrl) {
                    try {
                        const imageBytes = yield fetch(imageUrl).then(res => res.arrayBuffer());
                        const imageHash = figma.createImage(new Uint8Array(imageBytes)).hash;
                        const shape = node;
                        if (shape && "fills" in shape && Array.isArray(shape.fills)) {
                            const fills = [{
                                    type: "IMAGE",
                                    scaleMode: "FILL",
                                    imageHash
                                }];
                            shape.fills = fills;
                        }
                    }
                    catch (err) {
                        console.log("Image load error:", err);
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
                    if (node.name === "Genres" && Array.isArray(movie.genres)) {
                        node.characters = movie.genres.join(" - ");
                    }
                    if (node.name === "Language" && Array.isArray(movie.languages)) {
                        node.characters = movie.languages.join(" - ");
                    }
                    if (node.name === "Rating" && movie.Rating) {
                        node.characters = movie.Rating;
                    }
                }
                catch (err) {
                    console.log(`❌ Font load error for ${node.name}:`, err);
                }
            }
            // Recursively check deeper children
            if (hasChildren(node)) {
                applyMovieToChildren(node, movie);
            }
        }
    });
}
