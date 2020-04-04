import React from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../Login/useAuth';
import './Shipment.css'

const Shipment = () => {
    const { register, handleSubmit, errors } = useForm()
    const onSubmit = data => { console.log(data) }
  
    const auth = useAuth();
  
    return (
      <form className="shipment-form" onSubmit={handleSubmit(onSubmit)}>
        <input name="name" defaultValue={auth.user.name} placeholder="Name" ref={register({ required: true })} />
        {errors.name && <span className="error">Name is required</span>}

        <input name="email" defaultValue={auth.user.email} placeholder="Email" ref={register({ required: true })} />
        {errors.email && <span className="error">Email is required</span>}

        <input name="addressLine1" placeholder="Address Line 1" ref={register({ required: true })} />
        {errors.addressLine1 && <span className="error">Address is required</span>}

        <input name="addressLine2" placeholder="Address Line 2" ref={register} />

        <input name="city" placeholder="City"  ref={register({ required: true })} />
        {errors.city && <span className="error">City is required</span>}

        <input name="country" placeholder="Country" ref={register({ required: true })} />
        {errors.country && <span className="error">Country is required</span>}

        <input name="zipcode" placeholder="Zip Code"  ref={register({ required: true })} />
        {errors.zipcode && <span className="error">Zip Code is required</span>}
        
        <input type="submit" />
      </form>
    )
};

export default Shipment;