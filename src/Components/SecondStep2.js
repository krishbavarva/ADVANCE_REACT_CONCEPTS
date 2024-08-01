import React from 'react';
import { useForm } from 'react-hook-form';
import { useMachine } from '@xstate/react';
import { createMachine  } from 'xstate';

// Define the state machine
const formMachine = createMachine({
  id: 'form',
  initial: 'personal',
  states: {
    personal: {
      on: { NEXT: 'contact' }
    },
    contact: {
      on: { PREV: 'personal', NEXT: 'review' }
    },
    review: {
      on: { PREV: 'contact', SUBMIT: 'success' }
    },
    submitting: {
      invoke: {
        id: 'submitForm',
        src: 'submitForm',
        onDone: { target: 'success' },
        onError: { target: 'error' }
      }
    },
    success: { type: 'final' },
    error: {
      on: { RETRY: 'submitting' }
    }
  }
}, {
  services: {
    submitForm: async (context, event) => {
      // Simulate an API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      return true;  // Simulate successful submission
    }
  }
});

const MultiStepForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [current, send] = useMachine(formMachine);

  const onSubmit = data => {
    console.log(data);
    send({ type: 'SUBMIT' });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {current.matches('personal') && (
        <div>
          <h2>Personal Information</h2>
          <input {...register('firstName', { required: 'First name is required' })} placeholder="First Name" />
          {errors.firstName && <p>{errors.firstName.message}</p>}
          <input {...register('lastName', { required: 'Last name is required' })} placeholder="Last Name" />
          {errors.lastName && <p>{errors.lastName.message}</p>}
          <button type="button" onClick={() => send({ type: 'NEXT' })}>Next</button>
        </div>
      )}
      {current.matches('contact') && (
        <div>
          <h2>Contact Information</h2>
          <input {...register('email', { required: 'Email is required' })} placeholder="Email" />
          {errors.email && <p>{errors.email.message}</p>}
          <input {...register('phone', { required: 'Phone number is required' })} placeholder="Phone" />
          {errors.phone && <p>{errors.phone.message}</p>}
          <button type="button" onClick={() => send({ type: 'PREV' })}>Previous</button>
          <button type="button" onClick={() => send({ type: 'NEXT' })}>Next</button>
        </div>
      )}
      {current.matches('review') && (
        <div>
          <h2>Review Your Information</h2>
          {/* Display the form data for review here if needed */}
          <button type="button" onClick={() => send({ type: 'PREV' })}>Previous</button>
          <button type="submit" >Submit</button>
        </div>
      )}
      {current.matches('submitting') && <div>Submitting...</div>}
      {current.matches('success') && <div>Form submitted successfully!</div>}
      {current.matches('error') && (
        <div>
          An error occurred during submission.
          <button type="button" onClick={() => send({ type: 'RETRY' })}>Retry</button>
        </div>
      )}
    </form>
  );
};

export default MultiStepForm;
