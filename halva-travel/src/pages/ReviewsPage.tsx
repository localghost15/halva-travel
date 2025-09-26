// src/pages/ReviewsPage.tsx
import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import axios from "../api/axiosConfig";
import { useTranslation } from "react-i18next";

const BRAND = "Halva Travel";

// ————— UI helpers —————
const fadeInUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.5, delay },
});

const SectionCard: React.FC<React.PropsWithChildren<{ className?: string }>> = ({ className = "", children }) => (
  <motion.div
    {...fadeInUp()}
    className={`bg-white/90 backdrop-blur-sm border border-[#f3f0eb] rounded-2xl p-6 shadow-sm hover:shadow-md transition-all ${className}`}
  >
    {children}
  </motion.div>
);

const Pill: React.FC<{ children: React.ReactNode; tone?: "ok" | "muted" | "warn" }> = ({ children, tone = "ok" }) => {
  const styles =
    tone === "ok"
      ? "text-[#1FBB4D] border-[#1FBB4D]/20 bg-[#1FBB4D]/5"
      : tone === "warn"
      ? "text-[#E53935] border-[#E53935]/20 bg-[#E53935]/5"
      : "text-gray-500 border-gray-200 bg-gray-50/60";
  return (
    <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full border ${styles}`}>
      {children}
    </span>
  );
};

const Star: React.FC<{ filled?: boolean; onClick?: () => void; size?: number }> = ({ filled, onClick, size = 22 }) => (
  <button
    type="button"
    onClick={onClick}
    className="transition-transform hover:scale-110"
    aria-label="rate"
    title="rate"
  >
    <svg width={size} height={size} viewBox="0 0 24 24" className={filled ? "fill-amber-400 drop-shadow-sm" : "fill-none"}>
      <path
        className={filled ? "stroke-amber-400" : "stroke-gray-300"}
        strokeWidth="1.5"
        d="M12 3.75l2.7 5.47 6.04.88-4.37 4.26 1.03 6.02L12 17.77 6.6 20.38l1.03-6.02-4.37-4.26 6.04-.88L12 3.75z"
      />
    </svg>
  </button>
);

// ————— Types —————
type ReviewItem = {
  _id: string;
  name: string;
  text: string;
  rating: number;
  createdAt: string;
};

type CreateResponse = {
  review: ReviewItem & { email: string };
  voucher: { code: string; link: string; expiresAt?: string | null; note?: string };
  message: string;
};

// helper to map locale for dates
const localeForDate = (lng: string) =>
  lng.startsWith("ru") ? "ru-RU" : lng.startsWith("uz") ? "uz-UZ" : "en-US";

// ————— Form —————
const ReviewForm: React.FC<{
  onSuccess: (payload: CreateResponse) => void;
}> = ({ onSuccess }) => {
  const { t, i18n } = useTranslation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [text, setText] = useState("");
  const [rating, setRating] = useState<number>(5);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string>("");

  const canSubmit = useMemo(() => {
    return (
      name.trim().length >= 2 &&
      /\S+@\S+\.\S+/.test(email) &&
      text.trim().length >= 10 &&
      rating >= 1
    );
  }, [name, email, text, rating]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit || loading) return;
    setLoading(true);
    setErr("");
    try {
      const { data } = await axios.post<CreateResponse>("/reviews", {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        text: text.trim(),
        rating,
      });
      onSuccess(data);
      setText("");
      setRating(5);
    } catch (error: any) {
      const msg =
        error?.response?.data?.error ||
        error?.message ||
        t("reviews.form.errorGeneric");
      setErr(msg);
    } finally {
      setLoading(false);
    }
  };

  const remain = Math.max(0, 10 - text.trim().length);

  return (
    <SectionCard>
      <h2 className="text-xl font-semibold text-[#A88856] mb-3 tracking-tight">
        {t("reviews.form.title")}
      </h2>
      <p className="text-gray-600 text-sm mb-4">
        {t("reviews.subtitle", { brand: BRAND })}
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs text-gray-500 mb-1">{t("reviews.form.nameLabel")}</label>
            <input
              className="w-full rounded-xl border border-[#f3f0eb] bg-white/80 px-3 py-2 outline-none focus:ring-2 focus:ring-[#A88856]/30"
              placeholder={t("reviews.form.namePlaceholder")}
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">{t("reviews.form.emailLabel")}</label>
            <input
              className="w-full rounded-xl border border-[#f3f0eb] bg-white/80 px-3 py-2 outline-none focus:ring-2 focus:ring-[#A88856]/30"
              placeholder={t("reviews.form.emailPlaceholder")}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value.toLowerCase())}
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-xs text-gray-500 mb-1">{t("reviews.form.ratingLabel")}</label>
          <div className="flex items-center gap-1.5">
            {[1, 2, 3, 4, 5].map((n) => (
              <Star key={n} filled={n <= rating} onClick={() => setRating(n)} />
            ))}
            <Pill tone="muted">{rating}/5</Pill>
          </div>
        </div>

        <div>
          <label className="block text-xs text-gray-500 mb-1">{t("reviews.form.reviewLabel")}</label>
          <textarea
            className="w-full min-h-[120px] rounded-xl border border-[#f3f0eb] bg-white/80 px-3 py-2 outline-none focus:ring-2 focus:ring-[#A88856]/30"
            placeholder={t("reviews.form.reviewPlaceholder")}
            value={text}
            onChange={(e) => setText(e.target.value)}
            required
          />
          <div className="flex items-center justify-between mt-1">
            <span className="text-xs text-gray-400">
              {t("reviews.form.minCharsHint", { remain })}
            </span>
            {!canSubmit && <span className="text-xs text-gray-400">{t("reviews.form.requiredHint")}</span>}
          </div>
        </div>

        {err && (
          <div className="text-sm text-[#E53935] bg-[#E53935]/5 border border-[#E53935]/20 px-3 py-2 rounded-lg">
            {err}
          </div>
        )}

        <button
          disabled={!canSubmit || loading}
          className={`w-full md:w-auto inline-flex items-center justify-center gap-2 rounded-xl px-5 py-2.5 font-semibold text-white transition
          ${loading || !canSubmit ? "bg-gray-400 cursor-not-allowed" : "bg-[#A88856] hover:bg-[#987447]"}`}
        >
          {loading ? t("reviews.form.sending") : t("reviews.form.submit")}
        </button>
      </form>
    </SectionCard>
  );
};

// ————— Voucher banner —————
const VoucherBanner: React.FC<{ code: string; link: string; expiresAt?: string | null; note?: string }> = ({
  code,
  link,
  expiresAt,
  note,
}) => {
  const { t, i18n } = useTranslation();
  const formatted = expiresAt
    ? new Date(expiresAt).toLocaleDateString(localeForDate(i18n.language))
    : null;

  return (
    <SectionCard className="border-[#dfe7df]">
      <div className="flex items-start md:items-center justify-between gap-4 flex-col md:flex-row">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-lg font-semibold text-[#2b2b2b]">{t("reviews.voucher.readyTitle")}</h3>
            <Pill>{t("reviews.voucher.pdf")}</Pill>
            <Pill tone="ok">{t("reviews.voucher.brand", { brand: BRAND })}</Pill>
          </div>
          <p className="text-sm text-gray-600">
            {t("reviews.voucher.code")} <span className="font-semibold tracking-wide">{code}</span>
            {formatted && (
              <> {t("reviews.voucher.validUntil", { date: formatted })}</>
            )}
          </p>
          {note && <p className="text-xs text-gray-500 mt-1">{note}</p>}
        </div>
        <div className="flex items-center gap-2">
          <a
            href={link}
            target="_blank"
            rel="noopener"
            className="inline-flex items-center rounded-xl bg-[#1FBB4D] text-white px-4 py-2 font-semibold hover:bg-[#18a343] transition"
          >
            {t("reviews.voucher.download")}
          </a>
          <button
            className="rounded-xl border border-[#f3f0eb] px-3 py-2 text-sm text-gray-600 hover:bg-white transition"
            onClick={() => navigator.clipboard?.writeText(code)}
          >
            {t("reviews.voucher.copyCode")}
          </button>
        </div>
      </div>
    </SectionCard>
  );
};

// ————— Reviews list —————
const ReviewCard: React.FC<{ item: ReviewItem }> = ({ item }) => {
  const { i18n } = useTranslation();
  const date = new Date(item.createdAt).toLocaleDateString(localeForDate(i18n.language));
  return (
    <motion.div
      {...fadeInUp(0.05)}
      className="bg-white/90 backdrop-blur-sm border border-[#f3f0eb] rounded-2xl p-5 hover:shadow-md transition"
    >
      <div className="flex items-center justify-between mb-2">
        <div className="font-semibold text-[#2b2b2b]">{item.name}</div>
        <div className="flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} filled={i < item.rating} size={18} />
          ))}
        </div>
      </div>
      <p className="text-gray-600 text-sm leading-relaxed">{item.text}</p>
      <div className="mt-3 text-[11px] text-gray-400">{date}</div>
    </motion.div>
  );
};

const ReviewsGrid: React.FC<{ refreshToken?: number }> = ({ refreshToken = 0 }) => {
  const { t } = useTranslation();
  const [items, setItems] = useState<ReviewItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string>("");

  const fetchItems = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get<ReviewItem[]>("/reviews");
      setItems(data || []);
      setErr("");
    } catch (error: any) {
      setErr(error?.response?.data?.error || t("reviews.list.loadError"));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshToken]);

  if (loading) {
    return (
      <SectionCard>
        <div className="animate-pulse space-y-3">
          <div className="h-4 bg-gray-200/70 rounded w-1/3" />
          <div className="h-4 bg-gray-200/70 rounded w-2/3" />
          <div className="h-4 bg-gray-200/70 rounded w-1/2" />
        </div>
      </SectionCard>
    );
  }

  if (err) {
    return (
      <SectionCard>
        <div className="text-sm text-[#E53935]">{err}</div>
      </SectionCard>
    );
  }

  if (!items.length) {
    return (
      <SectionCard>
        <div className="text-sm text-gray-500">{t("reviews.list.empty")}</div>
      </SectionCard>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {items.map((it) => (
        <ReviewCard key={it._id} item={it} />
      ))}
    </div>
  );
};

// ————— Page —————
const ReviewsPage: React.FC = () => {
  const { t } = useTranslation();
  const [voucher, setVoucher] = useState<CreateResponse["voucher"] | null>(null);
  const [refreshToken, setRefreshToken] = useState(0);

  const handleSuccess = (data: CreateResponse) => {
    setVoucher(data.voucher);
    setRefreshToken((x) => x + 1);
  };

  return (
    <div className="max-w-screen-xl mx-auto px-4 py-16">
      <motion.h1
        className="text-4xl font-bold text-center mb-4 text-[#2b2b2b] tracking-tight"
        initial={{ opacity: 0, y: -18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {t("reviews.title")}
      </motion.h1>

      <motion.p
        className="text-center text-base max-w-2xl mx-auto text-gray-500 mb-10 leading-relaxed"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.15 }}
      >
        {t("reviews.subtitle", { brand: BRAND })}
      </motion.p>

      {voucher && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
          <VoucherBanner {...voucher} />
        </motion.div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <ReviewForm onSuccess={handleSuccess} />
        </div>
        <div className="md:col-span-2">
          <SectionCard>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-xl font-semibold text-[#A88856]">{t("reviews.list.latest")}</h2>
              <Pill tone="muted">{t("reviews.list.auto")}</Pill>
            </div>
            <ReviewsGrid refreshToken={refreshToken} />
          </SectionCard>
        </div>
      </div>
    </div>
  );
};

export default ReviewsPage;
