import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

// Mock analytics function
const trackEvent = (eventName, eventData) => {
  console.log(`Analytics event: ${eventName}`, eventData);
};

const AnalyticsForm = () => {
  const { register, handleSubmit, formState: { errors, submitCount } } = useForm();

  const onSubmit = (data) => {
    trackEvent('form_submitted', { formName: 'exampleForm', data });
    setEe('');
  };

  React.useEffect(() => {
    trackEvent('form_viewed', { formName: 'exampleForm' });

    return () => {
      trackEvent('form_abandoned', { formName: 'exampleForm' });
    };
  }, []);

  React.useEffect(() => {
    if (submitCount > 0) {
      trackEvent('form_submit_attempted', { formName: 'exampleForm', submitCount } );
    }
  }, [submitCount]);
  const [ee , setEe] = useState('');

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register('email', {
          required: true,
          onBlur: () => trackEvent('field_blurred', { field: 'email' }  , setEe("This field is empty"))
        })}
        placeholder="Email"
      />
     
      {errors.email && <span>field is empty</span>}
     
      <button type="submit">Submit</button>
      {<span>{ee}</span>}
    </form>
  );
};
export default AnalyticsForm