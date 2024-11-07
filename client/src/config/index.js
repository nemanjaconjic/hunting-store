export const registerFormControls = [
    {
      name: "userName",
      label: "User Name",
      placeholder: "Enter your user name",
      componentType: "input",
      type: "text",
    },
    {
      name: "email",
      label: "Email",
      placeholder: "Enter your email",
      componentType: "input",
      type: "email",
    },
    {
      name: "password",
      label: "Password",
      placeholder: "Enter your password",
      componentType: "input",
      type: "password",
    },
  ];

export const loginFormControls = [
    {
      name: "email",
      label: "Email",
      placeholder: "Enter your email",
      componentType: "input",
      type: "email",
    },
    {
      name: "password",
      label: "Password",
      placeholder: "Enter your password",
      componentType: "input",
      type: "password",
    },
  ];

export const addProductFormElements = [
    {
      label: "Title",
      name: "title",
      componentType: "input",
      type: "text",
      placeholder: "Enter product title",
    },
    {
      label: "Description",
      name: "description",
      componentType: "textarea",
      placeholder: "Enter product description",
    },
    {
      label: "Category",
      name: "category",
      componentType: "select",
      options: [
        { id: "firearms", label: "Firearms" },
        { id: "bows", label: "Bows" },
        { id: "knives", label: "Knives" },
        { id: "ammunition", label: "Ammunition" },
        { id: "optics", label: "Optics" },
        { id: "apparel", label: "Apparel" },
        { id: "accessories", label: "Accessories" }
      ],
    },
    {
      label: "Brand",
      name: "brand",
      componentType: "select",
      options: [
        { id: "cabelas", label: "Cabela's" },
        { id: "basspro", label: "Bass Pro" },
        { id: "yeti", label: "YETI" },
        { id: "remington", label: "Remington" },
        { id: "browning", label: "Browning" },
        { id: "sitkagear", label: "Sitka Gear" },
        { id: "underarmour", label: "Under Armour" },
        { id: "leupold", label: "Leupold" }
      ],
    },
    {
      label: "Price",
      name: "price",
      componentType: "input",
      type: "number",
      placeholder: "Enter product price",
    },
    {
      label: "Sale Price",
      name: "salePrice",
      componentType: "input",
      type: "number",
      placeholder: "Enter sale price (optional)",
    },
    {
      label: "Total Stock",
      name: "totalStock",
      componentType: "input",
      type: "number",
      placeholder: "Enter total stock",
    },
  ];

export const shoppingViewHeaderMenuItems = [
    {
      id: "home",
      label: "Home",
      path: "/shop/home",
    },
    {
      id: "products",
      label: "Products",
      path: "/shop/listing",
    },
    {
      id: "firearms",
      label: "Firearms",
      path: "/shop/listing",
    },
    {
      id: "bows",
      label: "Bows",
      path: "/shop/listing",
    },
    {
      id: "knives",
      label: "Knives",
      path: "/shop/listing",
    },
    {
      id: "ammunition",
      label: "Ammunition",
      path: "/shop/listing",
    },
    {
      id: "optics",
      label: "Optics",
      path: "/shop/listing",
    },
    {
      id: "apparel",
      label: "Apparel",
      path: "/shop/listing",
    },
    {
      id: "accessories",
      label: "Accessories",
      path: "/shop/listing",
    },
    {
      id: "search",
      label: "Search",
      path: "/shop/search",
    }
  ];

export const categoryOptionsMap = {
    firearms: "Firearms",
    bows: "Bows",
    knives: "Knives",
    ammunition: "Ammunition",
    optics: "Optics",
    apparel: "Apparel",
    accessories: "Accessories"
  };
  
export const brandOptionsMap = {
    cabelas: "Cabela's",
    basspro: "Bass Pro",
    yeti: "YETI",
    remington: "Remington",
    browning: "Browning",
    sitkagear: "Sitka Gear",
    underarmour: "Under Armour",
    leupold: "Leupold"
  };

export const filterOptions = {
    category: [
      { id: "firearms", label: "Firearms" },
      { id: "bows", label: "Bows" },
      { id: "knives", label: "Knives" },
      { id: "ammunition", label: "Ammunition" },
      { id: "optics", label: "Optics" },
      { id: "apparel", label: "Apparel" },
      { id: "accessories", label: "Accessories" }
    ],
    brand: [
      { id: "cabelas", label: "Cabela's" },
      { id: "basspro", label: "Bass Pro" },
      { id: "yeti", label: "YETI" },
      { id: "remington", label: "Remington" },
      { id: "browning", label: "Browning" },
      { id: "sitkagear", label: "Sitka Gear" },
      { id: "underarmour", label: "Under Armour" },
      { id: "leupold", label: "Leupold" }
    ],
  };
  
export const sortOptions = [
    { id: "price-lowtohigh", label: "Lowest Price" },
    { id: "price-hightolow", label: "Highest Price" },
    { id: "title-atoz", label: "Name Down" },
    { id: "title-ztoa", label: "Name Up" },
];


export const addressFormControls = [
  {
    label: "Address",
    name: "address",
    componentType: "input",
    type: "text",
    placeholder: "Enter your address",
  },
  {
    label: "City",
    name: "city",
    componentType: "input",
    type: "text",
    placeholder: "Enter your city",
  },
  {
    label: "Pincode",
    name: "pincode",
    componentType: "input",
    type: "text",
    placeholder: "Enter your pincode",
  },
  {
    label: "Phone",
    name: "phone",
    componentType: "input",
    type: "text",
    placeholder: "Enter your phone number",
  },
  {
    label: "Notes",
    name: "notes",
    componentType: "textarea",
    placeholder: "Enter any additional notes",
  },
];