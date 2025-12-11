import { Country } from "@/types/enum";


export default function VisitedCountries({ countries }: { countries: Country[] }) {
    if (!countries || countries.length === 0) return null;

    return (
        <div className="mt-6">
            <h3 className="font-semibold mb-2">Visited Countries</h3>
            <div className="flex flex-wrap gap-2">
                {countries.map((country) => (
                    <span
                        key={country}
                        className="px-3 py-1 bg-primary/10 border border-primary/20 rounded-full text-sm"
                    >
                        {country}
                    </span>
                ))}
            </div>
        </div>
    );
}
