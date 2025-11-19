const stringSimilarity = require("string-similarity");

interface UserItem {
    _id: string;
    listId: string;
    name: string;
    quantity: number;
    brandPreference: string;
}

export function processVendors(userItems: UserItem[], vendors: any[]) {

    const allVendor = vendors.map(vendor => {
        const { stock: vendorItems, ...rest } = vendor;

        // 1. Find matching items
        const mItems = userItems.map((item) => {
            const d = vendorItems.find((vItem: any) => {
                var similarity = stringSimilarity.compareTwoStrings(vItem.itemName, item.name);

                if (similarity > 0.2) {
                    return true
                }
            })
            if (d) {
                return {
                    _id: item._id,
                    name: item.name,
                    quantity: item.quantity,
                    price: d.price
                }
            } else {
                return {
                    _id: item._id,
                    name: item.name,
                    quantity: item.quantity,
                }
            }
        })

        const filteredMatchedItems = mItems.filter(item => item.price)

        const filteredUnMatchedItems = mItems.filter(item => !item.price)

        // 2. Coverage %
        const coveragePercent = (filteredMatchedItems.length / userItems.length) * 100;

        // 3. Total cost of matched items
        const totalCost = filteredMatchedItems.reduce((sum: number, item: any) => sum + (item.price * item.quantity), 0);

        return {
            ...rest,
            coveragePercent: Number(coveragePercent.toFixed(2)),
            totalCost,
            distanceKm: Number((vendor.distance / 1000).toFixed(2)),
            availableItems: filteredMatchedItems,
            missingItems: filteredUnMatchedItems
        };
    });

    return allVendor.filter(vendor => vendor.availableItems.length)
}

export function tagVendors(vendors: any[]) {
    if (vendors.length === 0) return vendors;

    // Find required rankings
    const nearest = [...vendors].sort((a, b) => a.distance - b.distance)[0]._id;
    const cheapest = [...vendors].sort((a, b) => a.totalCost - b.totalCost)[0]._id;
    const bestCoverage = [...vendors].sort((a, b) => b.coveragePercent - a.coveragePercent)[0]._id;

    return vendors.map(v => {
        const tags: string[] = [];

        if (v._id.equals(nearest)) tags.push("Nearest");
        if (v._id.equals(cheapest)) tags.push("Cheapest");
        if (v._id.equals(bestCoverage)) tags.push("Best Coverage");

        return {
            ...v,
            tags   // array of tags
        };
    });
}
