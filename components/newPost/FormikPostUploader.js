import { View, Text } from 'react-native'
import React, { useState } from 'react'
import * as Yup from 'yup'
import { Formik, formik } from 'formik'

const PLACEHOLDER_IMG = 'https://www.brownweinraub.com/wp-content/uploads/2017/09/placeholder'

const uploadPostSchema = Yup.object().shape({
    imageUrl: Yup.string().url().required('A URL is required'),
    caption: Yup.string().max(2200, 'Caption has reached the character limit'),
})



const FormikPostUploader = () => {
    const [thumbnailUrl, setThumbnailUrl] = useState(PLACEHOLDER_IMG)
  return (
    <Formik 
    initialValues={{caption: '', imageUrl: ''}}
    onSubmit={(values) => console.log(values)}
    validationSchema={uploadPostSchema}
    >
        {({ handleBlur, handleChange, handleSubmit, values, errors, isValid }) => (
            <>
            <View>
                
            </View>
            </>
        )}
    </Formik>
  )
}

export default FormikPostUploader