"use strict";

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
        if (!selection || !isContainer(selection)) {
            figma.notify("Please select a valid parent frame.");
            return;
        }
        applyMovieToChildren(selection, movie);
        figma.notify("Movie data applied successfully!");
    }

    if (msg.type === 'bulk-fill') {
        const movies = msg.data;
        const parentFrame = figma.currentPage.selection[0];

        if (!parentFrame || !isContainer(parentFrame)) {
            figma.notify("Please select a valid parent frame.");
            return;
        }

        // Cards can be FRAME, GROUP, COMPONENT, INSTANCE
        const childCards = parentFrame.children.filter(c => isContainer(c));

        if (childCards.length === 0) {
            figma.notify("No valid card frames found inside the selection.");
            return;
        }

        const minCount = Math.min(movies.length, childCards.length);

        for (let i = 0; i < minCount; i++) {
            applyMovieToChildren(childCards[i], movies[i]);
        }

        figma.notify(`Applied ${minCount} movies to ${minCount} cards.`);
    }
});

// Check if a node is a valid container (FRAME, GROUP, COMPONENT, INSTANCE)
function isContainer(node) {
    return (
        node.type === "FRAME" ||
        node.type === "GROUP" ||
        node.type === "INSTANCE" ||
        node.type === "COMPONENT"
    );
}

function applyMovieToChildren(parent, movie) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!parent || !("children" in parent)) return;

        const allowedImageNames = ["2:3", "16:9", "1:1"];

        recursiveUpdate(parent, movie, allowedImageNames);
    });
}

// Deep recursive search inside each card for TEXT and RECTANGLE layers
function recursiveUpdate(node, movie, allowedImageNames) {
    if (node.type === "RECTANGLE") {
        const nodeName = node.name.trim();
        if (allowedImageNames.includes(nodeName) && movie.Images && movie.Images[nodeName]) {
            const imageUrl = movie.Images[nodeName];
            if (imageUrl) {
                fetch(imageUrl)
                    .then(res => res.arrayBuffer())
                    .then(buffer => {
                        const imageHash = figma.createImage(new Uint8Array(buffer)).hash;
                        node.fills = [{
                            type: "IMAGE",
                            scaleMode: "FILL",
                            imageHash
                        }];
                    })
                    .catch(err => {
                        console.log(`❌ Image load error for ${nodeName}:`, err);
                    });
            }
        }
    }

    if (node.type === "TEXT") {
        figma.loadFontAsync(node.fontName)
            .then(() => {
                if (node.name === "Title" && movie.Title) {
                    node.characters = movie.Title;
                }
                if (node.name === "Description" && movie.Description) {
                    node.characters = movie.Description;
                }
                if (node.name === "Genres" && Array.isArray(movie.genres)) {
                    node.characters = movie.genres.join(" · ");
                }
                if (node.name === "Rating" && movie.Rating) {
                    node.characters = movie.Rating;
                }
            })
            .catch(err => {
                console.log(`❌ Font load error for ${node.name}:`, err);
            });
    }

    if ("children" in node) {
        for (const child of node.children) {
            recursiveUpdate(child, movie, allowedImageNames);
        }
    }
}
