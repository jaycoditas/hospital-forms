import { useForm } from "react-hook-form";

type cardsData = {
  aadhar_card_front: string;
  aadhar_card_back: string;
  insurance_card_front: string;
  insurance_card_back: string;
};

const CardDetails = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data: any) => {
    console.log(data.aadhar_card_front[0]);
    const formData = new FormData();
    formData.append("aadhar_card_front", data.aadhar_card_front[0]);
    console.log(URL.createObjectURL(data.aadhar_card_front[0]));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>
        Aadhar Card Front:
        <input
          type="file"
          {...register("aadhar_card_front")}
          accept="image/png, image/jpeg"
          required
        />
      </label>
      <label>
        Aadhar Card Back:
        <input
          type="file"
          {...register("aadhar_card_back")}
          accept="image/png, image/gif, image/jpeg"
          required
        />
      </label>
      <label>
        Insurance Card Front:
        <input
          type="file"
          {...register("insurance_card_front")}
          accept="image/png, image/jpeg"
          required
        />
      </label>
      <label>
        Insurance Card Front:
        <input
          type="file"
          {...register("insurance_card_back")}
          accept="image/png, image/jpeg"
          required
        />
      </label>
      <button type="submit">Proceed</button>
    </form>
  );
};

export default CardDetails;
