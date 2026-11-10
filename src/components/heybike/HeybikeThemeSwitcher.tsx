import { Contrast, MoonStar, Palette, Sun, Zap } from "lucide-react";

export type HeybikeTheme = "original" | "cyber" | "mono" | "sport";

const themes: Array<{
  id: HeybikeTheme;
  label: string;
  icon: typeof Sun;
}> = [
  { id: "original", label: "官网原版", icon: Sun },
  { id: "cyber", label: "暗黑科技", icon: MoonStar },
  { id: "mono", label: "极简黑白", icon: Contrast },
  { id: "sport", label: "高饱和运动", icon: Zap },
];

type Props = {
  value: HeybikeTheme;
  onChange: (theme: HeybikeTheme) => void;
};

export function HeybikeThemeSwitcher({ value, onChange }: Props) {
  return (
    <aside className="hb-theme-switcher" aria-label="Heybike 页面风格">
      <div className="hb-theme-switcher-title">
        <Palette size={15} aria-hidden="true" />
        <span>页面风格</span>
      </div>
      <div className="hb-theme-options" role="group" aria-label="选择页面风格">
        {themes.map(({ id, label, icon: Icon }) => (
          <button
            type="button"
            className={`hb-theme-option hb-theme-option-${id}`}
            aria-label={label}
            aria-pressed={value === id}
            title={label}
            onClick={() => onChange(id)}
            key={id}
          >
            <Icon size={16} aria-hidden="true" />
            <span>{label}</span>
          </button>
        ))}
      </div>
    </aside>
  );
}
