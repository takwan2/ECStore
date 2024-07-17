import { useState } from "react";

export function useUpdate(updateFn, initialValue) {
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateError, setUpdateError] = useState(null);
  const [updatedData, setUpdatedData] = useState(initialValue);

  const updateData = async (data) => {
    setIsUpdating(true);
    try {
      const result = await updateFn(data);
      setUpdatedData(result);
      alert("成功しました。")
    } catch (error) {
      setUpdateError({ message: error.message || 'サーバーとの通信に失敗しました。' });
      alert(error.message)
    } finally {
      setIsUpdating(false);
    }
  };

  return {
    isUpdating,
    updatedData,
    updateError,
    updateData
  };
}