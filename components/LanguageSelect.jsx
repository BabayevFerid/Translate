export default function LanguageSelect({ value, onChange, languages, autoOption = false }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="flex-1 p-2 border rounded"
    >
      {autoOption && <option value="auto">Auto Detect</option>}
      {Object.entries(languages).map(([code, name]) => (
        <option key={code} value={code}>
          {name}
        </option>
      ))}
    </select>
  );
}
