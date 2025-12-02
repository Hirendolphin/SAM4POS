export type StatusType = {
  status: string;
};

export type CommanResponseType = {
  status?: boolean;
  message?: string;
};

export type Plan = {
  id: number;
  created_at: string;
  updated_at: string;
  name: string;
  features: string;
  amount: string;
  duration: number;
  status: 'active' | 'inactive' | string;
};

export type PlanResponse = {
  status: boolean;
  total: number;
  per_page: number;
  page: number;
  num_pages: number;
  data: Plan[];
};

export type SubscriptionReducerState = {
  plans: Plan[];
  fetching: boolean;
};

export type LoginResultType = {
  data?: {
    last_login: string;
    dealer_id: string;
    customer_type: string;
    dd_name: string;
    subscription_status: string;
    status: string;
    subscription_plan: string;
  };
  token?: string;
} & CommanResponseType;

export type AuthStateType = {
  userLoginDetails: LoginResultType;
  fetching: boolean;
  loggedIn: boolean;
  forceLogout: {
    forcelogout: boolean;
  };
};

//new

export type Price = {
  id: number;
  id_price_level: number;
  long_plu_price: number;
  is_delete: boolean;
  is_inactive: boolean;
  plu: number;
};

export type PLUItem = {
  id: number;
  prices: Price[];
  cost_prices: [];
  plu_id: number;
  id_group1: number;
  id_group2: number;
  id_group3: number;
  id_plu_status_group: number;
  id_recipe: number;
  id_revenue_center: number;
  price_option: number;
  is_delete: boolean;
  is_inactive: boolean;
  plu_desc: string;
  strImageLink: string | null;
  plu_code: string;
  stock_qty: number;
  min_stock_qty: number;
  modifier_stock_qty: number;
  stock_link_plu: number;
  is_allow_price_change: boolean;
  is_allow_preset_halo_override: boolean;
  id_mlu_group: number;
  id_set_menu: number;
  is_default_data: boolean;
  long_ingredient_amt: number;
  id_mlu_chain: number;
  long_plu_cost_price: number;
  is_first_sale: boolean;
  str_kp_desc: string | null;
};

export type PLUList = {
  count: number;
  next: string | null;
  previous: string | null;
  results: PLUItem[];
};

export type PLUReducerState = {
  pluList: PLUList;
  currentPage: number;
  limit: number;
  fetching: boolean;
  loadingMore: boolean;
  statusGroup: StatusGroup[];
  priceLevel: StatusGroup[];
};

export type StatusGroup = {
  label: string;
  value: number;
};
