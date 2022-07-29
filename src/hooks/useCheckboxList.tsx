import { useState, ComponentProps, useCallback } from "react";
import { CheckboxList } from "@/components";
import { Prefecture } from "@/types";

export const useCheckboxList = (
  prefectures: Prefecture[]
): [number[], () => JSX.Element] => {
  const [checkedIds, setCheckedIds] = useState<number[]>([]);

  const handleClick = useCallback((id: number) => {
    setCheckedIds((prev) => {
      const index = prev.findIndex((checkedId) => checkedId === id);
      return index === -1
        ? prev.concat(id) // If id isn't in prev, add the id.
        : prev.slice(0, index).concat(prev.slice(index + 1)); // If id is in prev,  remove the id.
    });
  }, []);

  const renderCheckboxListForPrefectures = useCallback(() => {
    const data: ComponentProps<typeof CheckboxList>["data"] = prefectures.map(
      ({ id, name }) => {
        const isChecked = checkedIds.includes(id);
        return {
          id,
          isChecked,
          value: name,
        };
      }
    );
    return <CheckboxList title="都道府県" data={data} onClick={handleClick} />;
  }, [checkedIds, prefectures, handleClick]);

  return [checkedIds, renderCheckboxListForPrefectures];
};
