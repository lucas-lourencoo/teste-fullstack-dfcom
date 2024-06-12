import CurrencyInputBase, {
  CurrencyInputProps,
} from "react-currency-input-field";

interface CurrencyProps extends CurrencyInputProps {}

export function CurrencyInput({ ...props }: CurrencyProps) {
  return (
    <>
      <label htmlFor="input-name" className="font-semibold mb-2 inline-block">
        Valor
      </label>
      <CurrencyInputBase
        decimalsLimit={2}
        intlConfig={{ locale: "pt-BR", currency: "BRL" }}
        className="flex w-full rounded-md border border-input bg-transparent py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 h-10 px-4 hover:bg-zinc-800 border-zinc-600 focus:border-white mb-3"
        {...props}
      />
    </>
  );
}
