import { useState, useEffect ,useRef } from 'react'
import { useForm } from 'react-hook-form';
import Axios from 'axios';



const Infoadd = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    criteriaMode: 'all',
  });
 
  const onSubmit = async (data) => {
    console.log('Form data:', data);
    try {
      const response = await Axios.post("/api/info", data);
      console.log('Response data:', response.data);
      console.log('Data sent successfully');
      window.location.href = "/";
    } catch (error) {
      console.error('Error sending data:', error);
    }
  };
  
  

  return (
    <div>
      <h1 id="addh1">情報追加</h1>
      <form id="form" onSubmit={handleSubmit(onSubmit)}  action='/' method="post">
        <p class="pclass">注文者名:
          <input id="newname1" type="text" name="注文者名" placeholder="注文者名" {...register('注文者名', {
            required: {
              value: true,
              message: '注文者名が未入力です。',
            },
            pattern: {
              value: "",
              message: "",
            }
          })} /></p>
        {errors.注文者名?.message && <div class="errorColor">{errors.注文者名.message}</div>}
        <p class="pclass">注文者電話番号 :
          <input id="newname2" type="tel" name="注文者電話" placeholder="注文者電話" {...register('注文者電話', {
            required: {
              value: true,
              message: '電話番号が未入力です。',
            },
            pattern: {
              value: /^[0-9!-/:-@¥[-`{-~]*$/,
              message: '半角数字で入力してください。',
            }
          })} /></p>
        {errors.注文者電話?.message && <div class="errorColor">{errors.注文者電話.message}</div>}
        <p class="pclass">注文者住所 :
          <input id="newname3" type="text" name="注文者住所" placeholder="注文者住所"   {...register('注文者住所', {
            required: {
              value: true,
              message: '住所が未入力です',
            },
            pattern: {
              value: "",
              message: "",
            }
          })} /></p>
        {errors.注文者住所?.message && <div class="errorColor">{errors.注文者住所.message}</div>}
        <p class="pclass">注文日付 :
          <input id="newname4" type="date" name='注文日付'   {...register('注文日付', {
            required: {
              value: true,
              message: '日付が未入力です',
            },
            pattern: {
              value: "",
              message: "",
            }
          })} /></p >
        {errors.注文日付?.message && <div class="errorColor">{errors.注文日付.message}</div>}
        <p class="pclass">注文商品 :
          <input id="newname5" type="text" name='注文商品' placeholder="注文商品" {...register('注文商品', {
            required: {
              value: true,
              message: '注文商品が未入力です',
            },
            pattern: {
              value: "",
              message: "",
            }
          })} /></p >
        {errors.注文商品?.message && <div class="errorColor">{errors.注文商品.message}</div>}

        <p class="pclass">個数 :
          <input id="newname6" type="number" name="個数" placeholder="個数" {...register('個数', {
            required: {
              value: true,
              message: '個数が未入力です。',
            },
            pattern: {
              value: /^[0-9!-/:-@¥[-`{-~]*$/,
              message: '半角数字で入力してください。',
            }
          })} /></p>
        {errors.個数?.message && <div class="errorColor">{errors.個数.message}</div>}
        <p class="pclass">価格 :
          <input id="newname7" type="price" name="価格" placeholder="価格"  {...register('価格', {
            required: {
              value: true,
              message: '価格が未入力です。',
            },
            pattern: {
              value: /^[0-9!-/:-@¥[-`{-~]*$/,
              message: '半角数字で入力してください。',
            }
          })} /></p>
        {errors.価格?.message && <div class="errorColor">{errors.価格.message}</div>}
        <p class="pclass"><button type="submit"  id="submit-button" >送信</button></p>
      </form>
    </div>
  );
}
export default Infoadd
