import { useEffect, useRef, useState } from 'react'
import { KTSVG } from '../../../../_metronic/helpers'
import { Step1 } from './steps/Step1'
import { Step2 } from './steps/Step2'
import { Step3 } from './steps/Step3'
import { Step4 } from './steps/Step4'
import { Step5 } from './steps/Step5'
import { StepperComponent } from '../../../../_metronic/assets/ts/components'
import { Formik, Form, FormikValues } from 'formik'
import { ICreateAccount, createAccountSchemas, inits } from './CreateAccountWizardHelper'

const Vertical = () => {
  let bodyStyles = '';
  bodyStyles += '--kt-toolbar-height: 0px;';
  bodyStyles += '--kt-toolbar-height-tablet-and-mobile:: 0px;';
  document.body.setAttribute('style', bodyStyles);


  const stepperRef = useRef<HTMLDivElement | null>(null)
  const stepper = useRef<StepperComponent | null>(null)
  const [currentSchema, setCurrentSchema] = useState(createAccountSchemas[0])
  const [initValues] = useState<ICreateAccount>(inits)

  const loadStepper = () => {
    stepper.current = StepperComponent.createInsance(stepperRef.current as HTMLDivElement)
  }

  const prevStep = () => {
    if (!stepper.current) {
      return
    }

    stepper.current.goPrev()

    setCurrentSchema(createAccountSchemas[stepper.current.currentStepIndex - 1])
  }
  const submitStep = (values: ICreateAccount, actions: FormikValues) => {
    if (!stepper.current) {
      return
    }

    setCurrentSchema(createAccountSchemas[stepper.current.currentStepIndex])

    if (stepper.current.currentStepIndex !== stepper.current.totatStepsNumber) {
      stepper.current.goNext()
    } else {
      stepper.current.goto(1)
      actions.resetForm()
    }
  }

  useEffect(() => {
    if (!stepperRef.current) {
      return
    }

    loadStepper();

  }, [stepperRef])

  const steps = [
    {
      title: "Details",
      subtitle: "Setup Merchant Details"
    },
    {
      title: "Access",
      subtitle: "Setup Admin Access"
    },
    {
      title: "Configurations",
      subtitle: "Setup Merchant Configurations"
    },
    {
      title: "Choose Theme",
      subtitle: "Choose Desired Theme"
    },
    {
      title: "Completed",
      subtitle: "Woah, we are here"
    }
  ]



  return (
    <div
      ref={stepperRef}
      className='stepper stepper-pills stepper-column d-flex flex-column flex-xl-row flex-row-fluid'
      id='kt_create_account_stepper'
    >
      {/* begin::Aside*/}
      <div className='card d-flex justify-content-center justify-content-xl-start flex-row-auto w-100 w-xl-300px w-xxl-400px me-9'>
        {/* begin::Wrapper*/}
        <div className='card-body px-6 px-lg-10 px-xxl-15 py-20'>
          {/* begin::Nav*/}
          <div className='stepper-nav'>
            {/* begin::Step 1*/}
            {
              steps &&
              steps.length > 0 &&
              steps.map((step, i) => (
                <div key={i} className={`stepper-item ${i === 0 ? 'current' : ''}`} data-kt-stepper-element='nav'>
                  <div className='stepper-wrapper'>
                    <div className='stepper-icon w-40px h-40px'>
                      <i className='stepper-check fas fa-check'></i>
                      <span className='stepper-number'>{i + 1}</span>
                    </div>
                    <div className='stepper-label'>
                      <h3 className='stepper-title'>{step.title}</h3>

                      <div className='stepper-desc fw-semibold'>{step.subtitle}</div>
                    </div>
                  </div>
                  {
                    i < (steps.length - 1) &&
                    <div className='stepper-line h-40px'></div>
                  }
                </div>
              ))
            }
          </div>
          {/* end::Nav*/}
        </div>
        {/* end::Wrapper*/}
      </div>
      {/* begin::Aside*/}

      <div className='d-flex flex-row-fluid flex-center bg-body rounded'>
        <Formik validationSchema={currentSchema} initialValues={initValues} onSubmit={submitStep}>
          {(formik) => (
            <Form className='p-8' noValidate id='kt_create_account_form'>
              <div className='current' data-kt-stepper-element='content'>
                <Step1 formik={formik}/>
              </div>

              <div data-kt-stepper-element='content'>
                <Step2 formik={formik} />
              </div>

              <div data-kt-stepper-element='content'>
                <Step3 formik={formik} />
              </div>

              <div data-kt-stepper-element='content'>
                <Step4 formik={formik} />
              </div>

              <div data-kt-stepper-element='content'>
                <Step5 />
              </div>

              {
                stepper.current?.currentStepIndex !== steps.length &&

                <div className='d-flex flex-stack pt-10'>
                  <div className='mr-2'>
                    <button
                      onClick={prevStep}
                      type='button'
                      className='btn btn-lg btn-light-primary me-3'
                      data-kt-stepper-action='previous'
                    >
                      <KTSVG
                        path='/media/icons/duotune/arrows/arr063.svg'
                        className='svg-icon-4 me-1'
                      />
                      Back
                    </button>
                  </div>

                  <div>
                    <button type='submit' className='btn btn-lg btn-primary me-3'>
                      <span className='indicator-label'>
                        {stepper.current?.currentStepIndex !==
                          stepper.current?.totatStepsNumber! - 1 && 'Continue'}
                        {stepper.current?.currentStepIndex ===
                          stepper.current?.totatStepsNumber! - 1 && 'Submit'}
                        <KTSVG
                          path='/media/icons/duotune/arrows/arr064.svg'
                          className='svg-icon-3 ms-2 me-0'
                        />
                      </span>
                    </button>
                  </div>
                </div>
              }
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
}

export { Vertical }
