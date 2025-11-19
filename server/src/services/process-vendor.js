"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.processVendors = processVendors;
exports.tagVendors = tagVendors;
const stringSimilarity = require("string-similarity");
function processVendors(userItems, vendors) {
    const allVendor = vendors.map(vendor => {
        const { stock: vendorItems } = vendor, rest = __rest(vendor, ["stock"]);
        // 1. Find matching items
        const mItems = userItems.map((item) => {
            const d = vendorItems.find((vItem) => {
                var similarity = stringSimilarity.compareTwoStrings(vItem.itemName, item.name);
                if (similarity > 0.2) {
                    return true;
                }
            });
            if (d) {
                return {
                    _id: item._id,
                    name: item.name,
                    quantity: item.quantity,
                    price: d.price
                };
            }
            else {
                return {
                    _id: item._id,
                    name: item.name,
                    quantity: item.quantity,
                };
            }
        });
        const filteredMatchedItems = mItems.filter(item => item.price);
        const filteredUnMatchedItems = mItems.filter(item => !item.price);
        // 2. Coverage %
        const coveragePercent = (filteredMatchedItems.length / userItems.length) * 100;
        // 3. Total cost of matched items
        const totalCost = filteredMatchedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        return Object.assign(Object.assign({}, rest), { coveragePercent: Number(coveragePercent.toFixed(2)), totalCost, distanceKm: Number((vendor.distance / 1000).toFixed(2)), availableItems: filteredMatchedItems, missingItems: filteredUnMatchedItems });
    });
    return allVendor.filter(vendor => vendor.availableItems.length);
}
function tagVendors(vendors) {
    if (vendors.length === 0)
        return vendors;
    // Find required rankings
    const nearest = [...vendors].sort((a, b) => a.distance - b.distance)[0]._id;
    const cheapest = [...vendors].sort((a, b) => a.totalCost - b.totalCost)[0]._id;
    const bestCoverage = [...vendors].sort((a, b) => b.coveragePercent - a.coveragePercent)[0]._id;
    return vendors.map(v => {
        const tags = [];
        if (v._id.equals(nearest))
            tags.push("Nearest");
        if (v._id.equals(cheapest))
            tags.push("Cheapest");
        if (v._id.equals(bestCoverage))
            tags.push("Best Coverage");
        return Object.assign(Object.assign({}, v), { tags // array of tags
         });
    });
}
