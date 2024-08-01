import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const schema = z.object({
  username: z.string().min(3, { message: "Username must be at least 3 characters" }),
  email: z.string().email({ message: "Invalid email address" }),
  age: z.number().min(18, { message: "You must be at least 18 years old" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters" }),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

const AdvancedValidationForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema)
  });

  const onSubmit = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("username")} placeholder="Username" />
      {errors.username && <p>{errors.username.message}</p>}
     
      <input {...register("email")} placeholder="Email" />
      {errors.email && <p>{errors.email.message}</p>}
     
      <input {...register("age", { valueAsNumber: true })} placeholder="Age" type="number" />
      {errors.age && <p>{errors.age.message}</p>}
     
      <input {...register("password")} placeholder="Password" type="password" />
      {errors.password && <p>{errors.password.message}</p>}
     
      <input {...register("confirmPassword")} placeholder="Confirm Password" type="password" />
      {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
     
      <button type="submit">Submit</button>
    </form>
  );
};
export default AdvancedValidationForm