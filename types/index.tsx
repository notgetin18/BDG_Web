export type MetalType = "gold" | "silver";
export type purchaseType = "buy" | "sell";

// export type MetalType = "gold" | "silver";
export type PurchaseType = "buy" | "sell";
export type TransactionType = "gram" | "rupees";
export type AppliedCoupon = true | false;

type TippyType = {
  title: string;
  value: any;
};

// declaring the types for our state
export interface userInfo {
  isLoggedIn: boolean;
  userInfo: {
    kyc: any;
    userInfo: any;
    name: string;
    email: string;
    mobile?: string | number;
    photo?: string;
    dob?: Date | string;
    userdata?: number | string;
  };
  kyc: {
    panNumber?: string | undefined;
  };
  address: {
    city: string;
    line1: string;
    line2: string;
    pincode?: number | string;
    state: string;
  };
  bankDetails: {
    accountName: string;
    accountNumber: string;
    bankName: string;
    ifsc: string;
  };
  isAddressCompleted: boolean;
  isKycDone: boolean;
  isPanUploaded: boolean;
  isEmailVerified: boolean;
  isBasicDetailsCompleted: boolean;
  isMobileVerified: boolean;
  isBankDetailsCompleted: boolean;
  pageLoader: boolean;
}

export interface shop {
  metal: MetalType | string;
  gold: {
    isLoading: boolean;
    title: string;
    price: number;
    increment: boolean;
    percentage: number;
    btn: string;
    sellPrice: number;
    mcxPrice: string | number;
  };
  silver: {
    isLoading: boolean;
    title: string;
    price: number;
    increment: boolean;
    percentage: number;
    btn: string;
    sellPrice: number;
    mcxPrice: string | number;
  };
  currentInvestment: {
    isLoading: boolean;
    title: string;
    price: number;
    increment: boolean | string;
    percentage: number;
    btn: string;
  };
  vault: {
    isLoading: boolean;
    amount: string | number;
  };
  wallet: {
    isLoading: boolean;
    amount: string | number;
  };
  totalVault: {
    gold: number;
    silver: number;
  };
  purchaseType: purchaseType | string;
  pageLoader: boolean;
  loaderData: string;
}

interface MetalShop {
  isLoading: boolean;
  title: string;
  price: number;
  increment: boolean;
  percentage: number;
  btn: string;
  sellPrice: number;
  mcxPrice: string | number;
  metal: any;
}

export default interface ShopState {
  gold: MetalShop;
  silver: MetalShop;
  metal: MetalType;
  purchaseType: PurchaseType;
  amount: number;
  transactionType: TransactionType;
  displayText: string;
  amountWithoutTax: number;
  appliedCoupon: boolean;
  couponCode: string;
  gst: number;
  discount: number;
  promotionalGold: number;
  afterDiscountValue: number;
  amountWithGst: number;
  tippyText: any[];
}
