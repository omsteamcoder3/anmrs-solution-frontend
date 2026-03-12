// app/categories/page.tsx
import { fetchActiveCategories } from '@/lib/categoryService';
import Link from 'next/link';

// Define Category type
interface Category {
  _id: string;
  name: string;
  slug: string;
  description?: string;
}

export const dynamic = 'force-dynamic';

export default async function CategoriesPage() {
  const categories = await fetchActiveCategories() as Category[];
  const storeName = process.env.NEXT_PUBLIC_SITE_NAME || 'products';

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'rgb(152, 219, 108)' }}>
      {/* Header Section */}
      <section className="py-12 border-b border-green-700/20 shadow-sm">
        <div className="container mx-auto px-4 text-center">
          <h1 
            className="text-4xl md:text-5xl lg:text-6xl text-gray-800 mb-4 drop-shadow-sm"
            style={{ 
              fontFamily: 'Agbalumo, cursive',
              textShadow: '2px 2px 0 rgba(255,255,255,0.5)'
            }}
          >
            Product Categories
          </h1>
          <p 
            className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto mb-6"
            style={{ fontFamily: 'Agbalumo, cursive' }}
          >
            Browse our carefully curated collection of organic product categories. 
            Find the perfect products for your skin type and preferences.
          </p>
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full">
            <span className="text-sm font-medium text-gray-700">
              {categories.length}+ Categories
            </span>
            <span className="w-1.5 h-1.5 bg-green-700 rounded-full"></span>
            <span className="text-sm font-medium text-gray-700">
              100% Organic
            </span>
          </div>
        </div>
      </section>

      {/* Categories Grid Section */}
      <section className="py-12" aria-label="Product Categories Grid">
        <div className="container mx-auto px-4">
          {categories.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {categories.map((category) => (
                  <Link
                    key={category._id}
                    href={`/products?category=${category.slug || category._id}`}
                    className="group bg-white backdrop-blur-sm rounded-3xl border border-gray-200 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden p-6 text-center"
                    aria-label={`Browse ${category.name} products`}
                  >
                    <div 
                      className="w-16 h-16 bg-gradient-to-br from-green-700/10 to-green-700/5 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300"
                      aria-hidden="true"
                    >
                      <svg className="w-8 h-8" style={{ color: 'rgb(152, 219, 108)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                      </svg>
                    </div>
                    <h3 
                      className="text-xl font-bold text-gray-900 mb-2"
                      style={{ fontFamily: 'Agbalumo, cursive' }}
                    >
                      {category.name}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {category.description || `Premium organic ${category.name.toLowerCase()} products for healthy skin`}
                    </p>
                  </Link>
                ))}
              </div>

              {/* Category Benefits Section */}
              <div className="mt-16 max-w-4xl mx-auto">
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-200">
                  <h2 
                    className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 text-center"
                    style={{ fontFamily: 'Agbalumo, cursive' }}
                  >
                    Why Shop by Category?
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: 'rgb(152, 219, 108)' }}>
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-2">Targeted Solutions</h3>
                      <p className="text-sm text-gray-600">Find products specifically formulated for different skin types and concerns</p>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: 'rgb(152, 219, 108)' }}>
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-2">Easy Navigation</h3>
                      <p className="text-sm text-gray-600">Quickly find what you're looking for with our organized categories</p>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: 'rgb(152, 219, 108)' }}>
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-2">Quality Assured</h3>
                      <p className="text-sm text-gray-600">Every category features products with natural ingredients</p>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-white/80 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-12 h-12" style={{ color: 'rgb(152, 219, 108)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="text-gray-700 text-lg">No categories found.</p>
              <Link 
                href="/products" 
                className="inline-block mt-4 text-white px-6 py-2 rounded-lg transition-colors hover:opacity-90"
                style={{ backgroundColor: 'rgb(152, 219, 108)' }}
              >
                Browse All Products
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}