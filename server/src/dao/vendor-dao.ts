import Authorization from "../middleware/auth";
import Vendor from "../models/vendor-model";
import bcrypt from "bcryptjs";

interface LoginRequest {
    email: string;
    password: string;
}

interface Criteria {
    longitude: number,
    latitude: number,
    maxDistanceMeters: number
}

class VendorDao {
    private middleware: any;
    constructor() {
        this.middleware = new Authorization();
    }

    async createVendor(data: any) {

        const passwordHash = await bcrypt.hash(data.password, 10);

        return await Vendor.create({
            shopName: data.shopName,
            email: data.email,
            passwordHash,
            location: {
                type: "Point",
                coordinates: data.location.coordinates
            }
        });
    }

    async loginUser(data: LoginRequest) {
        const { email, password } = data;

        const user = await Vendor.findOne({ email });
        if (!user) throw new Error("Invalid Email or Password");

        const match = await bcrypt.compare(password, user.passwordHash);
        if (!match) throw new Error("Invalid Email or Password");

        const token = this.middleware.jwtSign(user);

        return { token, user };
    }

    async findByEmail(email: string) {
        return await Vendor.findOne({ email });
    }

    async addStockItem(vendorId: string, item: any) {
        return await Vendor.findByIdAndUpdate(
            vendorId,
            { $push: { stock: item } },
            { new: true }
        );
    }

    async updateStockItem(vendorId: string, updateData: any) {
        return await Vendor.findOneAndUpdate(
            { _id: vendorId, "stock._id": updateData.itemId },
            {
                $set: {
                    "stock.$.price": updateData.price,
                    "stock.$.availableQty": updateData.availableQty
                }
            },
            { new: true }
        );
    }

    async deleteStockItem(vendorId: string, itemId: string) {
        return await Vendor.findByIdAndUpdate(
            vendorId,
            { $pull: { stock: { _id: itemId } } },
            { new: true }
        );
    }

    async getVendorStock(vendorId: string, page: number, limit: number) {
        const skip = (page - 1) * limit;

        const vendor = await Vendor.findById(vendorId)
            .select({
                shopName: 1,
                location: 1,
                stock: { $slice: [skip, limit] }
            })
            .lean();

        // Get total stock count for pagination metadata
        const totalStock = await Vendor.aggregate([
            { $match: { _id: vendor?._id } },
            { $project: { stockCount: { $size: "$stock" } } }
        ]);

        return {
            shopName: vendor?.shopName,
            location: vendor?.location,
            stock: vendor?.stock || [],
            total: totalStock[0]?.stockCount || 0,
            page,
            limit
        };
    }

    async getNearbyShops(criteria: Criteria) {
        const { longitude, latitude, maxDistanceMeters = 10000 } = criteria

        return await Vendor.aggregate([
            {
                $geoNear: {
                    near: {
                        type: "Point",
                        coordinates: [longitude, latitude]
                    },
                    distanceField: "distance",
                    maxDistance: maxDistanceMeters,
                    spherical: true
                }
            },
            {
                $project: {
                    passwordHash: 0,
                    __v: 0
                }
            }
        ]);
    }
}

export default VendorDao;
