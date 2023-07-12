import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import ParseFloat from "@/utils";
import ShopState from "@/types";

export type MetalType = "gold" | "silver";
export type PurchaseType = "buy" | "sell";
export type TransactionType = "gram" | "rupees";

const initialState: ShopState = {
  gold: {
    isLoading: false,
    title: "Live Price",
    price: 6789,
    increment: true,
    percentage: 0.0989,
    btn: "View Trends",
    sellPrice: 5789,
    mcxPrice: 0,
    metal: "gold",
  },
  silver: {
    isLoading: false,
    title: "Live Price",
    price: 75,
    increment: true,
    percentage: 0.0980,
    btn: "View Trends",
    sellPrice: 72,
    mcxPrice: 0,
    metal: "silver",
  },
  metal: "gold",
  purchaseType: "buy",
  amount: 0,
  transactionType: "rupees",
  displayText: "0 gm",
  amountWithoutTax: 0,
  appliedCoupon: false,
  couponCode: "WELCOME_OFFER",
  gst: 0,
  discount: 0,
  promotionalGold: 0,
  afterDiscountValue: 0,
  amountWithGst: 0,
  tippyText: [],
};

const calculateAmounts = (amount: number, gst: number, metalPrice: number) => {
  const amountWithoutTax = ParseFloat(amount - gst, 2);
  const amountWithGst = ParseFloat(amount, 2);

  return {
    amountWithoutTax,
    amountWithGst,
    displayText: `${isNaN(amountWithoutTax) ? 0 : amountWithoutTax} ${
      amountWithoutTax > 1 ? "gms" : "gm"
    }`,
  };
};

const calculateGST = (amount: number, metalPrice: number) => {
  return ParseFloat((amount / 103) * 100 * 0.03, 2);
};

const calculatePromotionalGold = (
  couponCode: string,
  amountWithoutTax: number,
  metalPrice: number
) => {
  let discountValue = 0;
  let promotionalGold = 0;

  if (
    couponCode === "coupon499" &&
    amountWithoutTax >= 3333 &&
    amountWithoutTax <= 6665
  ) {
    discountValue = 50;
  } else if (couponCode === "coupon499" && amountWithoutTax >= 6665) {
    discountValue = 50;
  } else if (couponCode === "coupon899" && amountWithoutTax >= 6665) {
    discountValue = 100;
  } else if (
    couponCode === "coupon499" &&
    amountWithoutTax >= 499 &&
    amountWithoutTax <= 3332
  ) {
    discountValue = ParseFloat(amountWithoutTax * 0.015, 2);
  } else if (
    couponCode === "coupon899" &&
    amountWithoutTax >= 898 &&
    amountWithoutTax <= 6665
  ) {
    discountValue = ParseFloat(amountWithoutTax * 0.015, 2);
  }

  promotionalGold = ParseFloat(discountValue / metalPrice, 4);

  return { discountValue, promotionalGold };
};

const shopSlice = createSlice({
  name: "shop",
  initialState,
  reducers: {
    setMetalPriceForShop: (
      state,
      action: PayloadAction<{
        metal: MetalType;
        isLoading: false;
        title: string;
        price: number;
        increment: boolean;
        percentage: number;
        btn: string;
        sellPrice: number;
        mcxPrice: string | number;
      }>
    ) => {
      const metal: MetalType = action.payload.metal;

      const { ...payload } = action.payload;
      state[metal] = { ...state[metal], ...payload };
    },
    setMetalForShop: (state, action: PayloadAction<MetalType>) => {
      state.metal = action.payload;
    },
    setPurchaseTypeForShop: (state, action: PayloadAction<PurchaseType>) => {
      state.purchaseType = action.payload;
    },
    setCoupanApplied: (state, action: PayloadAction<boolean>) => {
      state.appliedCoupon = action.payload;
    },
    setCouponCode: (state, action: PayloadAction<string>) => {
      state.couponCode = action.payload;
    },
    setAmountForShop: (state, action: PayloadAction<number>) => {
      state.amount = action.payload;
      const amount = action.payload;
      const metal = state.metal;
      const transactionType = state.transactionType;
      const couponCode = state.couponCode;
      const metalPrice = state[metal].price;
      const gst = calculateGST(amount, metalPrice);

      state.gst = gst;
      state.amountWithGst = amount;

      if (state.purchaseType === "buy") {
        if (metal === "gold") {
          state.amountWithoutTax = Number(ParseFloat(amount - gst, 2));

          if (transactionType === "rupees") {
            state.tippyText = [
              {
                title: "Live Price(per gram)",
                value: metalPrice,
              },
              {
                title: "Value of bought gold",
                value: state.amountWithoutTax,
              },
              {
                title: "GST(3%)",
                value: gst,
              },
              {
                title: "Total Amount",
                value: amount,
              },
            ];

            if (state.appliedCoupon) {
              const { discountValue, promotionalGold } =
                calculatePromotionalGold(
                  couponCode,
                  state.amountWithoutTax,
                  metalPrice
                );

              state.tippyText.push({
                title: "Promotional Gold worth of Rs.",
                value: discountValue,
              });

              state.discount = discountValue;
              state.promotionalGold = promotionalGold;
            } else {
              state.discount = 0;
              state.promotionalGold = 0;
            }

            const { displayText } = calculateAmounts(
              state.amountWithoutTax,
              gst,
              metalPrice
            );
            state.displayText = displayText;
          }

          if (transactionType === "gram") {
            state.amountWithoutTax = Number(ParseFloat(amount * metalPrice, 2));

            state.tippyText = [
              {
                title: "Live Price(per gram)",
                value: metalPrice,
              },
              {
                title: "Value of bought gold",
                value: state.amountWithoutTax,
              },
              {
                title: "GST(3%)",
                value: gst,
              },
              {
                title: "Total Amount",
                value: amount,
              },
            ];

            const { displayText } = calculateAmounts(
              state.amountWithoutTax,
              gst,
              metalPrice
            );
            state.displayText = displayText;

            if (state.appliedCoupon) {
              const { discountValue, promotionalGold } =
                calculatePromotionalGold(
                  couponCode,
                  state.amountWithoutTax,
                  metalPrice
                );

              state.tippyText.push({
                title: "Promotional Gold worth of Rs.",
                value: discountValue,
              });

              state.discount = discountValue;
              state.promotionalGold = promotionalGold;
            } else {
              state.discount = 0;
              state.promotionalGold = 0;
            }
          }
        }

        if (metal === "silver") {
          state.amountWithoutTax = Number(ParseFloat(amount - gst, 2));

          if (transactionType === "rupees") {
            state.tippyText = [
              {
                title: "Live Price(per gram)",
                value: state.silver.price,
              },
              {
                title: "Value of bought silver",
                value: state.amountWithoutTax,
              },
              {
                title: "GST(3%)",
                value: gst,
              },
              {
                title: "Total Amount",
                value: amount,
              },
            ];

            const { displayText } = calculateAmounts(
              state.amountWithoutTax,
              gst,
              state.silver.price
            );
            state.displayText = displayText;
          }

          if (transactionType === "gram") {
            state.amountWithoutTax = Number(
              ParseFloat(amount * state.silver.price, 2)
            );

            state.tippyText = [
              {
                title: "Live Price(per gram)",
                value: state.silver.price,
              },
              {
                title: "Value of bought silver",
                value: state.amountWithoutTax,
              },
              {
                title: "GST(3%)",
                value: gst,
              },
              {
                title: "Total Amount",
                value: amount,
              },
            ];

            const { displayText } = calculateAmounts(
              state.amountWithoutTax,
              gst,
              state.silver.price
            );
            state.displayText = displayText;
          }
        }
      }

      if (state.purchaseType === "sell") {
        if (metal === "gold") {
          state.amountWithoutTax = Number(ParseFloat(amount - gst, 2));

          if (transactionType === "rupees") {
            state.tippyText = [
              {
                title: "Live Price(per gram)",
                value: state.gold.sellPrice,
              },
              {
                title: "Value of sold gold",
                value: state.amountWithoutTax,
              },
              {
                title: "GST(3%)",
                value: gst,
              },
              {
                title: "Total Amount",
                value: amount,
              },
            ];

            const { displayText } = calculateAmounts(
              state.amountWithoutTax,
              gst,
              state.gold.sellPrice
            );
            state.displayText = displayText;
          }

          if (transactionType === "gram") {
            state.amountWithoutTax = Number(
              ParseFloat(amount * state.gold.sellPrice, 2)
            );

            state.tippyText = [
              {
                title: "Live Price(per gram)",
                value: state.gold.sellPrice,
              },
              {
                title: "Value of sold gold",
                value: state.amountWithoutTax,
              },
              {
                title: "GST(3%)",
                value: gst,
              },
              {
                title: "Total Amount",
                value: amount,
              },
            ];

            const { displayText } = calculateAmounts(
              state.amountWithoutTax,
              gst,
              state.gold.sellPrice
            );
            state.displayText = displayText;
          }
        }

        if (metal === "silver") {
          state.amountWithoutTax = Number(ParseFloat(amount - gst, 2));

          if (transactionType === "rupees") {
            state.tippyText = [
              {
                title: "Live Price(per gram)",
                value: state.silver.sellPrice,
              },
              {
                title: "Value of sold silver",
                value: state.amountWithoutTax,
              },
              {
                title: "GST(3%)",
                value: gst,
              },
              {
                title: "Total Amount",
                value: amount,
              },
            ];

            const { displayText } = calculateAmounts(
              state.amountWithoutTax,
              gst,
              state.silver.sellPrice
            );
            state.displayText = displayText;
          }

          if (transactionType === "gram") {
            state.amountWithoutTax = Number(
              ParseFloat(amount * state.silver.sellPrice, 2)
            );

            state.tippyText = [
              {
                title: "Live Price(per gram)",
                value: state.silver.sellPrice,
              },
              {
                title: "Value of sold silver",
                value: state.amountWithoutTax,
              },
              {
                title: "GST(3%)",
                value: gst,
              },
              {
                title: "Total Amount",
                value: amount,
              },
            ];

            const { displayText } = calculateAmounts(
              state.amountWithoutTax,
              gst,
              state.silver.sellPrice
            );
            state.displayText = displayText;
          }
        }
      }
    },
    setTransactionTypeForShop: (
      state,
      action: PayloadAction<TransactionType>
    ) => {
      state.transactionType = action.payload;
    },
    setDisplayText: (state, action: PayloadAction<string>) => {
      state.displayText = action.payload;
    },
  },
});

export const {
  setMetalPriceForShop,
  setMetalForShop,
  setPurchaseTypeForShop,
  setCoupanApplied,
  setCouponCode,
  setAmountForShop,
  setTransactionTypeForShop,
  setDisplayText,
} = shopSlice.actions;

export default shopSlice.reducer;
