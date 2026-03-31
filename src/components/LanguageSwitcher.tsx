import React from "react";
import { useT } from "next-i18next/client";
import { usePathname, useRouter } from "next/navigation";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { LANGUAGES } from "@/app/i18n/constants";
import { Globe } from "lucide-react";

export const LanguageSwitcher: React.FC = () => {
    const { i18n } = useT();
    const pathname = usePathname();
    const router = useRouter();

    const handleLanguageChange = (lang: string) => {
        const segments = pathname.split("/");
        // Basic locale-in-path replacement: segments[1] is the locale
        segments[1] = lang;
        router.push(segments.join("/"));
    };

    return (
        <Select
            value={i18n.language}
            onValueChange={handleLanguageChange}
        >
            <SelectTrigger className="w-full bg-slate-800 border-slate-700 text-slate-100 h-9 text-xs">
                <div className="flex items-center gap-2">
                    <Globe className="h-3.5 w-3.5 text-slate-400" />
                    <SelectValue placeholder="Language" />
                </div>
            </SelectTrigger>
            <SelectContent className="bg-slate-800 border-slate-700 text-slate-100">
                {LANGUAGES.map((lang) => (
                    <SelectItem
                        key={lang.code}
                        value={lang.code}
                        className="cursor-pointer"
                    >
                        {lang.label}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
};
