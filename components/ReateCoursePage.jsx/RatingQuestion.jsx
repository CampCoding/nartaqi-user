import { useId, useMemo, useRef, useState } from "react";
import cx from "../../lib/cx";

export function RatingQuestion({
  question = "ما رأيك في الدورات المقدمة من المنصة بشكل عام؟",
  // value/label pairs; add {allowText:true} to show an input when selected
  options = [
    { value: "excellent", label: "ممتاز" },
    { value: "very_good", label: "جيد جدا" },
    { value: "needs_improvement", label: "تحتاج إلى تحسين" },
  ],
  name = "course_opinion",
  value, // controlled value (string or {value, text} if allowText)
  defaultValue = null, // for uncontrolled
  onChange, // (next) => void
  required = false,
  disabled = false,
  readOnly = false,
  allowDeselect = false, // allow unselecting the current choice
  helperText, // optional hint under the group
  dir = "rtl", // force RTL by default
}) {
  const groupId = useId();
  const isControlled = value !== undefined;
  const [internal, setInternal] = useState(defaultValue);
  const selected = isControlled ? value : internal;

  // Normalize selected primitive value (string) even if object {value,text}
  const selectedVal = useMemo(
    () =>
      (selected && typeof selected === "object" ? selected.value : selected) ??
      null,
    [selected]
  );

  const itemsRefs = useRef([]);

  const commitChange = (next) => {
    if (readOnly || disabled) return;
    if (!isControlled) setInternal(next);
    onChange?.(next);
  };

  const handleSelect = (opt) => {
    if (readOnly || disabled) return;
    let next = opt.value;
    if (allowDeselect && selectedVal === opt.value) next = null;
    // if option allows text and previously had custom text, preserve it
    if (opt.allowText) {
      const prevText =
        selected && typeof selected === "object" && selected.value === opt.value
          ? selected.text || ""
          : "";
      commitChange({ value: opt.value, text: prevText });
    } else {
      commitChange(next);
    }
  };

  const updateText = (opt, text) => {
    if (readOnly || disabled) return;
    commitChange({ value: opt.value, text });
  };

  const idxByValue = useMemo(
    () => options.findIndex((o) => o.value === selectedVal),
    [options, selectedVal]
  );

  const onKeyDown = (e) => {
    if (readOnly || disabled) return;
    const key = e.key;
    const isHorizontal = false; // stacked layout
    const prevKeys = isHorizontal ? ["ArrowLeft", "ArrowUp"] : ["ArrowUp"];
    const nextKeys = isHorizontal ? ["ArrowRight", "ArrowDown"] : ["ArrowDown"];

    if (key === " " || key === "Enter") {
      e.preventDefault();
      if (idxByValue >= 0) handleSelect(options[idxByValue]);
      return;
    }
    if ([...prevKeys, ...nextKeys].includes(key)) {
      e.preventDefault();
      if (!options.length) return;
      let nextIndex = idxByValue;
      if (nextKeys.includes(key)) {
        nextIndex = (idxByValue + 1 + options.length) % options.length;
      } else if (prevKeys.includes(key)) {
        nextIndex = (idxByValue - 1 + options.length) % options.length;
      }
      const nextOpt = options[nextIndex];
      handleSelect(nextOpt);
      // move focus visually
      itemsRefs.current[nextIndex]?.focus();
    }
  };

  return (
    <div
      className="flex flex-col items-start gap-3 sm:gap-4 w-full max-w-full"
      dir={dir}
    >
      {/* Question */}
      <div className="flex items-center w-full px-3 sm:px-4">
        <p
          className={cx(
            "flex-1 font-bold text-text",
            // أحجام مرنة بدون تغيير الشكل العام
            "text-sm leading-7 sm:text-base sm:leading-[50px]"
          )}
        >
          {question}
          {required && <span className="mr-2 text-red-600">*</span>}
        </p>
      </div>

      {/* Helper (اختياري) */}
      {helperText && (
        <div className="w-full px-3 sm:px-4 -mt-2">
          <p className="text-xs sm:text-sm text-zinc-500">{helperText}</p>
        </div>
      )}

      {/* Radio Group */}
      <div
        role="radiogroup"
        aria-labelledby={`${groupId}-label`}
        onKeyDown={onKeyDown}
        className="flex flex-col items-start gap-3 sm:gap-6 w-full  sm:px-0"
      >
        <span id={`${groupId}-label`} className="sr-only">
          {question}
        </span>

        {options.map((opt, i) => {
          const isSelected = selectedVal === opt.value;
          const border = isSelected ? "border-secondary" : "border-zinc-200";
          const text = isSelected
            ? "text-secondary font-semibold"
            : "text-text";
          const ring = isSelected ? "ring-2 ring-orange-200" : "";
          const disabledCls = disabled
            ? "opacity-60 cursor-not-allowed"
            : "cursor-pointer";
          return (
            <div
              key={opt.value}
              role="radio"
              aria-checked={isSelected}
              aria-disabled={disabled || readOnly}
              tabIndex={disabled ? -1 : 0}
              ref={(el) => (itemsRefs.current[i] = el)}
              onClick={() => handleSelect(opt)}
              className={cx(
                // نفس الشكل الأساسي مع تحسينات استجابة طفيفة
                "flex items-center justify-start gap-2 sm:gap-3",
                "w-full relative border-[3px] border-solid rounded-[30px]",
                // مسافات داخلية مرنة على الشاشات الصغيرة
                "p-3 sm:p-4",
                border,
                ring,
                disabledCls,
                // تحسين وضوح التركيز للمستخدمين بلوحة المفاتيح
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-0 focus-visible:ring-orange-300"
              )}
            >
              {/* Visual radio */}
              <span
                className={cx(
                  "grid place-items-center rounded-full border-[2px]",
                  // تكبير طفيف لسهولة اللمس على الموبايل
                  "w-6 h-6",
                  isSelected ? "border-secondary" : "border-zinc-300"
                )}
                aria-hidden="true"
              >
                <span
                  className={cx(
                    "block rounded-full transition-transform",
                    // نفس المقاس العام مع الحفاظ على الإحساس البصري
                    "w-[12px] h-[12px]",
                    isSelected ? "bg-secondary scale-100" : "bg-transparent scale-75"
                  )}
                />
              </span>

              {/* Label */}
              <div
                className={cx(
                  "relative flex items-center",
                  // على الشاشات الصغيرة اسمح بالالتفاف لمنع القص
                  "text-sm sm:text-base",
                  "leading-7 sm:leading-[50px]",
                  "whitespace-normal sm:whitespace-nowrap",
                  text
                )}
              >
                {opt.label}
              </div>

              {/* Hidden real radio for forms */}
              <input
                type="radio"
                name={name}
                className="sr-only"
                checked={!!isSelected}
                onChange={() => {}}
                required={required}
                disabled={disabled || readOnly}
                value={opt.value}
              />

              {/* Optional free-text when selected */}
              {opt.allowText && isSelected && (
                <input
                  type="text"
                  placeholder="اذكر التفاصيل..."
                  className={cx(
                    // يحافظ على نفس الروح لكن قابل للتمدد على الشاشات الصغيرة
                    "ml-auto mr-2 sm:mr-4 w-full max-w-full sm:max-w-md",
                    "rounded-2xl border border-zinc-300 px-3 sm:px-4 py-2",
                    "text-sm sm:text-base leading-6 sm:leading-7",
                    "outline-none focus:ring-2 focus:ring-orange-300"
                  )}
                  value={
                    typeof selected === "object" && selected.value === opt.value
                      ? selected.text || ""
                      : ""
                  }
                  onClick={(e) => e.stopPropagation()}
                  onChange={(e) => updateText(opt, e.target.value)}
                  disabled={disabled || readOnly}
                  dir="rtl"
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
