import React from 'react'
import { Formik, Form, Field, ErrorMessage, useFormik } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { Status, Wrapper } from '@googlemaps/react-wrapper'
import { usePlacesWidget } from 'react-google-autocomplete'

import { register } from './registrationSlice'

function MemberRegistration() {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            ic: '',
            phone: '',
            homeAddress: {
                address: '',
                streetNumber: '',
                route: '',
                sublocality: '',
                locality: '',
                administrative_area_level_1: '',
                country: '',
                postal_code: '',
                loc: {
                    lat: null,
                    lng: null
                },
                addressObject: {},
            },
            votingIsSameAsHome: false,
            votingAddress: {
                address: '',
                streetNumber: '',
                route: '',
                sublocality: '',
                locality: '',
                administrative_area_level_1: '',
                country: '',
                postal_code: '',
                loc: {
                    lat: null,
                    lng: null
                },
                addressObject: {},
            },
            declaration: false,
        },
        onSubmit: values => {
            console.log(values)
            dispatch(register(values))
                .then(res => {
                    navigate('/register/success')
                    //console.log('> ' + res)
                })
        }
    })

    const { ref: homeRef, autoCompleteRef: homeAutoCompleteRef } = usePlacesWidget({
        apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        options: {
            types: ['address'],
        },
        onPlaceSelected: (place) => {
            console.log(place)
            formik.setFieldValue('homeAddress.addressObject', place)
            formik.setFieldValue('homeAddress.address', place.formatted_address)
            formik.setFieldValue('homeAddress.loc.lat', place.geometry.location.lat())
            formik.setFieldValue('homeAddress.loc.lng', place.geometry.location.lng())
            place.address_components.forEach(component => {
                if (component.types.includes('street_number')) {
                    formik.setFieldValue('homeAddress.streetNumber', component.short_name)
                }

                if (component.types.includes('route')) {
                    formik.setFieldValue('homeAddress.route', component.short_name)
                }

                if (component.types.includes('sublocality')) {
                    formik.setFieldValue('homeAddress.sublocality', component.short_name)
                }

                if (component.types.includes('locality')) {
                    formik.setFieldValue('homeAddress.locality', component.short_name)
                }

                if (component.types.includes('administrative_area_level_1')) {
                    formik.setFieldValue('homeAddress.administrative_area_level_1', component.short_name)
                }

                if (component.types.includes('country')) {
                    formik.setFieldValue('homeAddress.country', component.long_name)
                }

                if (component.types.includes('postal_code')) {
                    formik.setFieldValue('homeAddress.postal_code', component.short_name)
                }

            })
        }
    })

    const { ref: votingRef, autoCompleteRef: votingAutoCompleteRef } = usePlacesWidget({
        apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        options: {
            types: ['address'],
        },
        onPlaceSelected: (place) => {
            console.log(place)
            formik.setFieldValue('votingAddress.addressObject', place)
            formik.setFieldValue('votingAddress.address', place.formatted_address)
            formik.setFieldValue('votingAddress.loc.lat', place.geometry.location.lat())
            formik.setFieldValue('votingAddress.loc.lng', place.geometry.location.lng())
            place.address_components.forEach(component => {
                if (component.types.includes('street_number')) {
                    formik.setFieldValue('votingAddress.streetNumber', component.short_name)
                }

                if (component.types.includes('route')) {
                    formik.setFieldValue('votingAddress.route', component.short_name)
                }

                if (component.types.includes('sublocality')) {
                    formik.setFieldValue('votingAddress.sublocality', component.short_name)
                }

                if (component.types.includes('locality')) {
                    formik.setFieldValue('votingAddress.locality', component.short_name)
                }

                if (component.types.includes('administrative_area_level_1')) {
                    formik.setFieldValue('votingAddress.administrative_area_level_1', component.short_name)
                }

                if (component.types.includes('country')) {
                    formik.setFieldValue('votingAddress.country', component.long_name)
                }

                if (component.types.includes('postal_code')) {
                    formik.setFieldValue('votingAddress.postal_code', component.short_name)
                }

            })
        }
    })

    return (
        <>
            <div className='flex flex-col h-full bg-black text-white p-12 items-center gap-8'>
                <div className='font-bold text-3xl tracking-wide bg-white text-black py-5 px-8'>
                    MUDA
                </div>

                <form onSubmit={formik.handleSubmit} className='flex gap-4 flex-col w-1/2'>
                    <div className='flex flex-col gap-2'>
                        <div className='flex flex-col'>
                            <p>Nama</p>
                            <p className='text-xs text-slate-500'>Mengikut Kad Pengenalan</p>
                        </div>
                        <input 
                            type='text'
                            name='name'
                            placeholder='Abdullah Hukum'
                            onChange={formik.handleChange}
                            value={formik.values.name}
                        />
                    </div>

                    <div className='flex flex-col gap-2'>
                        <div className='flex flex-col'>
                            <p>Nombor Kad Pengenalan</p>
                        </div>
                        <input 
                            type='text'
                            name='ic'
                            placeholder='990101141234'
                            onChange={formik.handleChange}
                            value={formik.values.ic}
                        />
                    </div>

                    
                    <div className='flex gap-2'>
                        <div className='flex flex-1 flex-col gap-2'>
                            <div className='flex flex-col'>
                                <p>Nombor Telefon</p>
                            </div>
                            <input 
                                type='tel'
                                name='phone'
                                placeholder='+601112345678'
                                onChange={formik.handleChange}
                                value={formik.values.phone}
                            />
                        </div>
                        <div className='flex flex-1 flex-col gap-2'>
                            <div className='flex flex-col'>
                                <p>Alamat E-mel</p>
                            </div>
                            <input 
                                type='email'
                                name='email'
                                placeholder='anda@emel.com'
                                onChange={formik.handleChange}
                                value={formik.values.email}
                            />
                        </div>
                    </div>

                    <div className='mt-8 text-lg text-slate-400'>Alamat Kediaman</div>

                    <>
                        <div className='flex flex-col gap-2'>
                            <div className='flex flex-col'>
                                <p>Alamat</p>
                            </div>
                            <input 
                                ref={homeRef}
                                type='text'
                                name='homeAddress.address'
                                placeholder='82, Jalan SS 2/3, SS 2, 47300 Petaling Jaya, Selangor'
                                onChange={formik.handleChange}
                                value={formik.values.homeAddress.address}
                            />
                        </div>

                        <div className='flex gap-2'>
                            <div className='flex flex-col gap-2'>
                                <div className='flex flex-col'>
                                    <p>Nombor Rumah</p>
                                </div>
                                <input 
                                    type='text'
                                    name='homeAddress.streetNumber'
                                    placeholder='82'
                                    onChange={formik.handleChange}
                                    value={formik.values.homeAddress.streetNumber}
                                />
                            </div>

                            <div className='flex flex-1 flex-col gap-2'>
                                <div className='flex flex-col'>
                                    <p>Jalan 1</p>
                                </div>
                                <input 
                                    type='text'
                                    name='homeAddress.route'
                                    placeholder='Jalan SS 2/3'
                                    onChange={formik.handleChange}
                                    value={formik.values.homeAddress.route}
                                />
                            </div>

                            <div className='flex flex-1 flex-col gap-2'>
                                <div className='flex flex-col'>
                                    <p>Jalan 2</p>
                                </div>
                                <input 
                                    type='text'
                                    name='homeAddress.sublocality'
                                    placeholder='SS2'
                                    onChange={formik.handleChange}
                                    value={formik.values.homeAddress.sublocality}
                                />
                            </div>
                        </div>

                        

                        <div className='flex gap-2'>
                            <div className='flex flex-1 flex-col gap-2'>
                                <div className='flex flex-col'>
                                    <p>Bandar</p>
                                </div>
                                <input 
                                    type='text'
                                    name='homeAddress.locality'
                                    placeholder='Petaling Jaya'
                                    onChange={formik.handleChange}
                                    value={formik.values.homeAddress.locality}
                                />
                            </div>

                            <div className='flex flex-col gap-2'>
                                <div className='flex flex-col'>
                                    <p>Poskod</p>
                                </div>
                                <input 
                                    type='text'
                                    name='homeAddress.postal_code'
                                    placeholder='47300'
                                    onChange={formik.handleChange}
                                    value={formik.values.homeAddress.postal_code}
                                />
                            </div>

                            
                        </div>

                        <div className='flex gap-2'>
                            <div className='flex flex-1 flex-col gap-2'>
                                <div className='flex flex-col'>
                                    <p>Negeri</p>
                                </div>
                                <input 
                                    type='text'
                                    name='homeAddress.administrative_area_level_1'
                                    placeholder='Selangor'
                                    onChange={formik.handleChange}
                                    value={formik.values.homeAddress.administrative_area_level_1}
                                />
                            </div>

                            <div className='flex flex-1 flex-col gap-2'>
                                <div className='flex flex-col'>
                                    <p>Negara</p>
                                </div>
                                <input 
                                    type='text'
                                    name='homeAddress.country'
                                    placeholder='Malaysia'
                                    onChange={formik.handleChange}
                                    value={formik.values.homeAddress.country}
                                />
                            </div>
                        </div>
                    
                    </>

                    {/* VOTING ADDRESS */}
                    <div className='mt-8 text-slate-400'>
                        <p className='text-lg'>Alamat Mengundi</p>
                        <p className='text-xs'>Alamat Mengundi adalah berdasarkan Kad Pengenalan</p>
                    </div>

                    <div>
                        <input 
                            type="checkbox" 
                            name="votingIsSameAsHome" 
                            onChange={(e) => {
                                if (e.target.checked) {
                                    formik.setFieldValue('votingAddress', formik.values.homeAddress)
                                    formik.setFieldValue('votingIsSameAsHome', true)
                                } else {
                                    formik.setFieldValue('votingAddress', {
                                        address: '',
                                        streetNumber: '',
                                        route: '',
                                        sublocality: '',
                                        locality: '',
                                        postal_code: '',
                                        administrative_area_level_1: '',
                                        country: ''
                                    })
                                }
                            }} 
                            value={formik.values.votingIsSameAsHome}/>
                        <span className='ml-2'>Alamat Mengundi saya adalah sama dengan Alamat Kediaman</span>
                    </div>
                    
                    {
                        !formik.values.votingIsSameAsHome &&
                        <>
                            <div className='flex flex-col gap-2'>
                                <div className='flex flex-col'>
                                    <p>Alamat</p>
                                </div>
                                <input 
                                    ref={votingRef}
                                    type='text'
                                    name='votingAddress.address'
                                    placeholder='82, Jalan SS 2/3, SS 2, 47300 Petaling Jaya, Selangor'
                                    onChange={formik.handleChange}
                                    value={formik.values.votingAddress.address}
                                />
                            </div>

                            <div className='flex gap-2'>
                                <div className='flex flex-col gap-2'>
                                    <div className='flex flex-col'>
                                        <p>Nombor Rumah</p>
                                    </div>
                                    <input 
                                        type='text'
                                        name='votingAddress.streetNumber'
                                        placeholder='82'
                                        onChange={formik.handleChange}
                                        value={formik.values.votingAddress.streetNumber}
                                    />
                                </div>

                                <div className='flex flex-1 flex-col gap-2'>
                                    <div className='flex flex-col'>
                                        <p>Jalan 1</p>
                                    </div>
                                    <input 
                                        type='text'
                                        name='votingAddress.route'
                                        placeholder='Jalan SS 2/3'
                                        onChange={formik.handleChange}
                                        value={formik.values.votingAddress.route}
                                    />
                                </div>

                                <div className='flex flex-1 flex-col gap-2'>
                                    <div className='flex flex-col'>
                                        <p>Jalan 2</p>
                                    </div>
                                    <input 
                                        type='text'
                                        name='votingAddress.sublocality'
                                        placeholder='SS2'
                                        onChange={formik.handleChange}
                                        value={formik.values.votingAddress.sublocality}
                                    />
                                </div>
                            </div>

                            

                            <div className='flex gap-2'>
                                <div className='flex flex-1 flex-col gap-2'>
                                    <div className='flex flex-col'>
                                        <p>Bandar</p>
                                    </div>
                                    <input 
                                        type='text'
                                        name='votingAddress.locality'
                                        placeholder='Petaling Jaya'
                                        onChange={formik.handleChange}
                                        value={formik.values.votingAddress.locality}
                                    />
                                </div>

                                <div className='flex flex-col gap-2'>
                                    <div className='flex flex-col'>
                                        <p>Poskod</p>
                                    </div>
                                    <input 
                                        type='text'
                                        name='votingAddress.postal_code'
                                        placeholder='47300'
                                        onChange={formik.handleChange}
                                        value={formik.values.votingAddress.postal_code}
                                    />
                                </div>

                                
                            </div>

                            <div className='flex gap-2'>
                                <div className='flex flex-1 flex-col gap-2'>
                                    <div className='flex flex-col'>
                                        <p>Negeri</p>
                                    </div>
                                    <input 
                                        type='text'
                                        name='votingAddress.administrative_area_level_1'
                                        placeholder='Selangor'
                                        onChange={formik.handleChange}
                                        value={formik.values.votingAddress.administrative_area_level_1}
                                    />
                                </div>

                                <div className='flex flex-1 flex-col gap-2'>
                                    <div className='flex flex-col'>
                                        <p>Negara</p>
                                    </div>
                                    <input 
                                        type='text'
                                        name='votingAddress.country'
                                        placeholder='Malaysia'
                                        onChange={formik.handleChange}
                                        value={formik.values.votingAddress.country}
                                    />
                                </div>
                            </div>
                        </>
                    }

                    <div className='mt-6'>
                        <input type="checkbox" name="declaration" onChange={formik.handleChange} value={formik.values.declaration}/>
                        <span className='ml-2'>Semua maklumat di atas adalah benar</span>
                    </div>

                    <button
                        disabled={!formik.isValid || !formik.values.declaration}
                        type='submit'
                        className='disabled:text-slate-700 disabled:border-slate-700 disabled:pointer-events-none border-2 border-slate-400 hover:bg-slate-400 hover:text-black rounded-lg px-4 py-2 w-fit'
                    >
                        Hantar
                    </button>

                </form>

            </div>
        </>
    )
}

export default MemberRegistration