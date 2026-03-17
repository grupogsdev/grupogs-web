import { Star } from "lucide-react";
import { COLORS } from "@/lib/constants";

type Testimonial = {
  name: string;
  role: string;
  avatar: string;
  rating: number;
  text: string;
};

export function Testimonials({
  testimonials,
  columns = 3,
  showAll = false,
}: {
  testimonials: readonly Testimonial[];
  columns?: 2 | 3;
  showAll?: boolean;
}) {
  const items = showAll ? testimonials : testimonials.slice(0, 3);

  return (
    <div
      className={`grid gap-6 ${
        columns === 3
          ? "md:grid-cols-2 lg:grid-cols-3"
          : "md:grid-cols-2"
      }`}
    >
      {items.map((t) => (
        <div
          key={t.name}
          className="p-6 rounded-2xl bg-white border border-gray-200 shadow-sm hover:shadow-md transition"
        >
          <div className="flex items-center gap-4 mb-4">
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0"
              style={{ backgroundColor: COLORS.primary }}
            >
              {t.avatar}
            </div>
            <div>
              <p className="font-semibold text-gray-900">{t.name}</p>
              <p className="text-sm text-gray-500">{t.role}</p>
            </div>
          </div>
          <div className="flex gap-1 mb-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                size={18}
                className={i < t.rating ? "fill-[var(--secondary)] text-[var(--secondary)]" : "text-gray-200"}
              />
            ))}
          </div>
          <p className="text-gray-600 text-sm leading-relaxed">&ldquo;{t.text}&rdquo;</p>
        </div>
      ))}
    </div>
  );
}
