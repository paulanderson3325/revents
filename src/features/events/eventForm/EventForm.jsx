import React from "react"
import { Segment, Header, Button } from "semantic-ui-react"
import cuid from "cuid"
import { Link } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { updateEvent, createEvent } from "../eventActions"
import { Formik, Form } from "formik"
import * as Yup from "yup"
import MyTextInput from "../../../app/common/form/MyTextInput"
import MyTextArea from "../../../app/common/form/MyTextArea"
import MyDateInput from "../../../app/common/form/MyDateInput"
import MySelectInput from "../../../app/common/form/MySelectInput"
import { categoryData } from "../../../app/api/categoryOptions"

export default function EventForm({ match, history }) {
  const dispatch = useDispatch()
  const selectedEvent = useSelector((state) =>
    state.event.events.find((e) => e.id === match.params.id)
  )

  const initialValues = selectedEvent ?? {
    title: "",
    category: "",
    description: "",
    city: "",
    venue: "",
    date: "",
  }

  const validationSchema = Yup.object({
    title: Yup.string().required("You must provide a title"),
    category: Yup.string().required("You must provide a category"),
    description: Yup.string().required("You must provide a description"),
    city: Yup.string().required("You must provide a city"),
    venue: Yup.string().required("You must provide a venue"),
    date: Yup.string().required("You must provide a date"),
  })

  return (
    <Segment clearing>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          selectedEvent
            ? dispatch(updateEvent({ ...selectedEvent, ...values }))
            : dispatch(
                createEvent({
                  ...values,
                  id: cuid(),
                  hostedBy: "Bob",
                  attendees: [],
                  hostPhotoURL: "/assets/user.png",
                })
              )
          history.push("/events")
        }}
      >
        {({ isSubmitting, dirty, isValid }) => (
          <Form className='ui form'>
            <Header sub color='teal' content='Event Details' />
            <MyTextInput name='title' placeholder='Event title' />
            <MySelectInput
              name='category'
              placeholder='Event category'
              options={categoryData}
            />
            <MyTextArea
              name='description'
              placeholder='Event description'
              rows={3}
            />
            <Header sub color='teal' content='Event Location Details' />
            <MyTextInput name='city' placeholder='Event city' />
            <MyTextInput name='venue' placeholder='Event venue' />
            <MyDateInput
              name='date'
              placeholderText='Event date'
              timeFormat='HH:mm'
              showTimeSelect
              timeCaption='time'
              dateFormat='MMMM d, yyyy h:mm a'
            />
            <Button
              loading={isSubmitting}
              disabled={!isValid || !dirty || isSubmitting}
              type='submit'
              floated='right'
              positive
              content='Submit'
            />
            <Button
              disabled={isSubmitting}
              as={Link}
              to='/events'
              type='submit'
              floated='right'
              content='Cancel'
            />
          </Form>
        )}
      </Formik>
    </Segment>
  )
}
