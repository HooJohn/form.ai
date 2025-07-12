"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isRepeatableSectionData = isRepeatableSectionData;
// Helper to check if a section is a repeatable section data structure
function isRepeatableSectionData(section) {
    return section.isRepeatable === true && 'instances' in section;
}
