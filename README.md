# ZILO Clone - E-Commerce Store with RudderStack Analytics

A modern, fast-delivery e-commerce website built with Next.js 14, TypeScript, and RudderStack analytics integration. Inspired by [zilo.one](https://zilo.one), this project features a complete shopping experience with comprehensive event tracking.

## Features

### 🛍️ E-Commerce Functionality
- **Product Catalog**: Browse products across multiple collections (Men's, Women's, Accessories)
- **Product Details**: Detailed product pages with size/color selection
- **Shopping Cart**: Full cart management with quantity updates
- **Search**: Real-time product search functionality
- **Checkout**: Complete checkout flow with order confirmation
- **User Authentication**: Login and signup with session management
- **Pincode Serviceability**: Check delivery availability by pincode

### 📊 RudderStack Analytics Integration
All events are tracked using RudderStack JavaScript SDK v3:

#### Frontend Events
- **Page Viewed**: Tracks all page visits
- **Collection Viewed**: Logs when users view product collections
- **Product Viewed**: Tracks product detail page visits
- **Product Added to Cart**: Logs cart additions with product details
- **Search Submitted**: Captures search queries and results
- **Pincode Submitted**: Tracks pincode checks and serviceability status

#### Backend Events (Simulated)
- **Login Success**: Tracks successful user logins
- **Signup Success**: Logs new user registrations
- **Orders Received**: Captures order placement with full details
- **First Purchase Completed within 7 Days**: Tracks first-time buyers

### 🎨 Design
- Modern dark theme with neon yellow accents (inspired by zilo.one)
- Fully responsive design for mobile, tablet, and desktop
- Smooth animations and transitions
- Tailwind CSS for styling

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand with persistence
- **Analytics**: RudderStack JavaScript SDK v3
- **Images**: Next.js Image optimization

## Getting Started

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager
- RudderStack account (for analytics)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ecom-nextjs-rudderstack
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**

   Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

   Update `.env.local` with your RudderStack credentials:
   ```env
   NEXT_PUBLIC_RUDDERSTACK_WRITE_KEY=your_write_key_here
   NEXT_PUBLIC_RUDDERSTACK_DATA_PLANE_URL=https://your-dataplane-url.com
   ```

   **Note**: Without RudderStack credentials, the app will run but analytics won't be tracked. A warning will appear in the console.

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open the application**

   Navigate to [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
ecom-nextjs-rudderstack/
├── src/
│   ├── app/                    # Next.js 14 App Router pages
│   │   ├── layout.tsx          # Root layout with header/footer
│   │   ├── page.tsx            # Homepage
│   │   ├── collections/        # Collection pages
│   │   ├── products/           # Product detail pages
│   │   ├── cart/               # Shopping cart
│   │   ├── checkout/           # Checkout flow
│   │   ├── search/             # Search results
│   │   ├── login/              # Login page
│   │   ├── signup/             # Signup page
│   │   ├── account/            # User account
│   │   └── order-confirmation/ # Order success
│   ├── components/             # Reusable React components
│   │   ├── Header.tsx          # Navigation header
│   │   ├── Footer.tsx          # Footer
│   │   ├── ProductCard.tsx     # Product card component
│   │   ├── PincodeChecker.tsx  # Pincode verification
│   │   └── RudderStackProvider.tsx
│   ├── lib/                    # Utility libraries
│   │   └── rudderstack.ts      # RudderStack integration & tracking functions
│   ├── store/                  # State management
│   │   └── useStore.ts         # Zustand store (cart, user, pincode)
│   ├── data/                   # Mock data
│   │   └── products.ts         # Product catalog
│   └── types/                  # TypeScript types
│       └── index.ts            # Type definitions
├── public/                     # Static assets
├── .env.example                # Environment variables template
├── package.json                # Dependencies
├── tsconfig.json               # TypeScript config
├── tailwind.config.js          # Tailwind CSS config
└── README.md                   # This file
```

## RudderStack Events Reference

### 1. Page Viewed (Frontend)
Tracks all page navigation.

```typescript
trackPageView('Home', { /* optional properties */ });
```

**Triggered on**: All pages (Home, Collections, Products, Cart, Checkout, etc.)

### 2. Collection Viewed (Frontend)
Logs collection page views.

```typescript
trackCollectionViewed({
  collection_id: string,
  collection_name: string,
  products_count?: number
});
```

**Triggered on**: Collection pages (`/collections/[id]`)

### 3. Product Viewed (Frontend)
Tracks product detail views.

```typescript
trackProductViewed({
  product_id: string,
  name: string,
  price: number,
  category?: string,
  image_url?: string,
  brand?: string
});
```

**Triggered on**: Product detail pages (`/products/[id]`)

### 4. Product Added to Cart (Frontend)
Logs cart additions.

```typescript
trackProductAddedToCart({
  product_id: string,
  name: string,
  price: number,
  quantity: number,
  category?: string
});
```

**Triggered on**: Add to cart button click

### 5. Search Submitted (Frontend)
Captures search queries.

```typescript
trackSearchSubmitted(query: string, resultsCount?: number);
```

**Triggered on**: Search form submission

### 6. Pincode Submitted (Frontend)
Tracks pincode verification.

```typescript
trackPincodeSubmitted(pincode: string, serviceable: boolean);
```

**Triggered on**: Pincode check button click

### 7. Login Success (Backend)
Logs successful logins.

```typescript
trackLoginSuccess(userId: string, email: string);
```

**Triggered on**: Successful login

### 8. Signup Success (Backend)
Tracks new registrations.

```typescript
trackSignupSuccess(userId: string, email: string, name?: string);
```

**Triggered on**: Successful signup

### 9. Orders Received (Backend)
Captures order placement.

```typescript
trackOrderReceived({
  order_id: string,
  total: number,
  products: Array<{
    product_id: string,
    name: string,
    price: number,
    quantity: number
  }>,
  currency?: string
});
```

**Triggered on**: Successful order placement

### 10. First Purchase Completed within 7 Days (Backend)
Tracks first-time purchases.

```typescript
trackFirstPurchase(userId: string, orderId: string, total: number);
```

**Triggered on**: First order within 7 days of account creation

## Demo Features

### Pincode Serviceability
For demo purposes, pincodes starting with 1, 2, 3, 4, or 5 are considered serviceable.

### Authentication
Any email and password combination will work for login/signup in demo mode.

### Products
The app includes 22 demo products across 3 collections with realistic data and images from Unsplash.

## Deployment

### Build for Production

```bash
npm run build
# or
yarn build
```

### Start Production Server

```bash
npm start
# or
yarn start
```

### Deploy to Vercel

The easiest way to deploy is using [Vercel](https://vercel.com):

```bash
npm install -g vercel
vercel
```

Don't forget to add your environment variables in Vercel's dashboard.

## RudderStack Setup

1. **Create a RudderStack account** at [rudderstack.com](https://www.rudderstack.com)

2. **Set up a JavaScript source**
   - Go to Sources → Add Source
   - Select "JavaScript"
   - Copy the Write Key

3. **Configure Data Plane URL**
   - Note your Data Plane URL (usually in format: `https://[your-name].dataplane.rudderstack.com`)

4. **Add destinations** (optional)
   - Connect Google Analytics, Mixpanel, Amplitude, or other tools
   - Configure destination settings

5. **Update environment variables**
   - Add your Write Key and Data Plane URL to `.env.local`

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

### Adding New Products

Edit `src/data/products.ts` to add new products or collections.

### Customizing Tracking

Modify `src/lib/rudderstack.ts` to add custom tracking functions or adjust event properties.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT

## Acknowledgments

- Design inspiration: [zilo.one](https://zilo.one)
- Analytics: [RudderStack](https://www.rudderstack.com)
- Images: [Unsplash](https://unsplash.com)
- Framework: [Next.js](https://nextjs.org)

## Support

For issues or questions:
- Check the [RudderStack documentation](https://www.rudderstack.com/docs/)
- Review Next.js documentation at [nextjs.org/docs](https://nextjs.org/docs)

---

**Built with ❤️ using Next.js and RudderStack**
