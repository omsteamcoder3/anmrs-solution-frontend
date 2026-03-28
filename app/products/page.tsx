import ProductGrid from '@/components/products/ProductGrid';
import { Roboto_Flex} from 'next/font/google';

const markoOne = Roboto_Flex({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
});

interface ProductsPageProps {
  searchParams: Promise<{
    category?: string;
    sortBy?: string;
    sortOrder?: string;
    page?: string;
  }>;
}

export default async function ProductsPage(props: ProductsPageProps) {
  const searchParams = await props.searchParams;
  const selectedCategory = searchParams.category;

  return (
    <div className="min-h-screen bg-orange-400">
      {/* Header Section */}
      <section className="py-12 border-b border-orange-500/20 shadow-sm bg-black">
        <div className="container mx-auto px-4 text-center">
          <h1 
            className={`${markoOne.className} text-4xl md:text-5xl lg:text-6xl text-white mb-3 drop-shadow-lg`}
            style={{ 
              textShadow: '2px 2px 0 rgba(249, 115, 22, 0.3)'
            }}
          >
            Our Products
          </h1>
          <p 
            className={`${markoOne.className} text-lg md:text-xl text-orange-400/90 max-w-2xl mx-auto drop-shadow`}
          >
            Discover our amazing collection of quality products
          </p>
        </div>
      </section>

      {/* Products Grid Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <ProductGrid category={selectedCategory} />
        </div>
      </section>
    </div>
  );
}