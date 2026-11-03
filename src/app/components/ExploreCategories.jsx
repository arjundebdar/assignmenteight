import {
  FaBookOpen,
  FaBook,
  FaLaptopCode,
  FaFlask,
  FaLandmark,
  FaHeart,
  FaSearch,
  FaUser,
  FaMagic,
} from "react-icons/fa";

const categories = [
  {
    name: "Fiction",
    description: "Explore imaginative stories and exciting adventures.",
    icon: FaBookOpen,
    color: "bg-blue-100 text-blue-600",
  },
  {
    name: "Non-fiction",
    description: "Discover real-life stories, facts, and practical knowledge.",
    icon: FaBook,
    color: "bg-green-100 text-green-600",
  },
  {
    name: "Technology",
    description: "Explore modern technology, programming, and innovation.",
    icon: FaLaptopCode,
    color: "bg-purple-100 text-purple-600",
  },
  {
    name: "Science",
    description: "Discover scientific ideas and explore the wonders of nature.",
    icon: FaFlask,
    color: "bg-cyan-100 text-cyan-600",
  },
  {
    name: "History",
    description: "Travel through the past and explore historical events.",
    icon: FaLandmark,
    color: "bg-orange-100 text-orange-600",
  },
  {
    name: "Romance",
    description: "Enjoy beautiful stories of love and relationships.",
    icon: FaHeart,
    color: "bg-pink-100 text-pink-600",
  },
  {
    name: "Mystery",
    description: "Experience thrilling mysteries and suspenseful stories.",
    icon: FaSearch,
    color: "bg-yellow-100 text-yellow-600",
  },
  {
    name: "Biography",
    description: "Get inspired by the lives of remarkable people.",
    icon: FaUser,
    color: "bg-indigo-100 text-indigo-600",
  },
  {
    name: "Fantasy",
    description: "Enter magical worlds filled with imagination and wonder.",
    icon: FaMagic,
    color: "bg-rose-100 text-rose-600",
  },
];

export default function ExploreCategories() {
  return (
    <section className="bg-gray-50 py-20">
      <div className="mx-auto max-w-7xl px-5">
        {/* Section Heading */}
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <span className="mb-4 inline-block rounded-full bg-emerald-100 px-5 py-2 text-sm font-semibold uppercase tracking-wider text-emerald-700">
            Explore Our Collection
          </span>

          <h2 className="text-3xl font-extrabold text-gray-900 md:text-4xl">
            Discover Books by <span className="text-emerald-600">Category</span>
          </h2>

          <p className="mt-5 leading-7 text-gray-500">
            From exciting adventures to inspiring real-life stories, explore
            different categories and find your next favorite book.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => {
            const Icon = category.icon;

            return (
              <div
                key={category.name}
                className="group rounded-2xl border border-gray-200 bg-white p-7  hover:border-emerald-300 hover:shadow-xl"
              >
                <div className="flex items-center justify-between">
                  <div
                    className={`flex h-16 w-16 items-center justify-center rounded-2xl ${category.color}`}
                  >
                    <Icon className="text-3xl" />
                  </div>
                </div>

                <h3 className="mt-6 text-xl font-bold text-gray-800 transition-colors group-hover:text-emerald-600">
                  {category.name}
                </h3>

                <p className="mt-3 text-sm leading-7 text-gray-500">
                  {category.description}
                </p>

                <div className="mt-6 h-1 w-10 rounded-full bg-emerald-500 transition-all duration-300 group-hover:w-20"></div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
