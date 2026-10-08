type QuantityDialogProps = {
  action: "add" | "take";
  amount: string;
  message: string;
  onAmountChange: (value: string) => void;
  onClose: () => void;
  onConfirm: () => void;
};

export default function QuantityDialog({
  action,
  amount,
  message,
  onAmountChange,
  onClose,
  onConfirm,
}: QuantityDialogProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-sm rounded-xl bg-white p-6 shadow-xl">
        <h3 className="text-lg font-semibold">
          {action === "add" ? "Fyll på lager" : "Ta ut från lager"}
        </h3>

        <label htmlFor="quantity" className="mt-4 block text-sm font-medium">
          Hur många?
        </label>

        <input
          id="quantity"
          type="number"
          min="1"
          step="1"
          value={amount}
          onChange={(event) => onAmountChange(event.target.value)}
          className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-[#001C89]"
          autoFocus
        />

        {message && (
          <p className="mt-3 text-sm text-red-600" role="alert">
            {message}
          </p>
        )}

        <div className="mt-5 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-gray-300 px-4 py-2 hover:bg-gray-100"
          >
            Avbryt
          </button>

          <button
            type="button"
            onClick={onConfirm}
            className="rounded-lg bg-[#001C89] px-4 py-2 font-medium text-white hover:bg-[#001C89]/90"
          >
            Bekräfta
          </button>
        </div>
      </div>
    </div>
  );
}
