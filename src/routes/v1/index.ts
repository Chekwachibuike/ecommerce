import { Router } from "express";
import userRoutes from "./user";
import authRoutes from "./auth";
import categoryRoutes from "./category";
import upload from "../../utils/multer";
import productRoutes from "./product";
import billingInfoRouter from "./billingInfo"
import cartRouter from "./cart";
import cartItemsRoutes from "./cartItem";
import orderRoutes from "./order";
const router = Router();

router.use("/users", userRoutes); // User-related routes
router.use("/auth", authRoutes); // Authentication-related routes
router.use("/categories", categoryRoutes);
// router.use("/upload", upload, awsUpload);
router.use("/cart", cartRouter);
router.use("/cart-items", cartItemsRoutes);
router.use("/products", productRoutes);
router.use("/billing-info", billingInfoRouter);
router.use("/orders", orderRoutes);
export default router;
