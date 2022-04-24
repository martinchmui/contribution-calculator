import React from 'react';
import { connect } from 'react-redux';
import { createHolding, editHolding, deleteHolding, editContribution, editResults } from '../actions'
import { Form, Field } from 'react-final-form';
import arrayMutators from 'final-form-arrays'
import { FieldArray } from 'react-final-form-arrays';

const InputForm = (props) => {
    const onSubmit = ({ holdings, contributions }) => {
        props.editResults({ holdings, contributions })
    };
    const required = value => (value ? undefined : 'Required');
    const mustBeNumber = value => (isNaN(value) ? 'Must be a number' : undefined)
    const composeValidators = (...validators) => value =>
        validators.reduce((error, validator) => error || validator(value), undefined)


    return (
        <Form
            onSubmit={onSubmit}
            mutators={{ ...arrayMutators }}
            initialValues={props}
            render={({ handleSubmit, values }) => (
                <form onSubmit={handleSubmit}>
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Holding</th>
                                <th scope="col">Target %</th>
                                <th scope="col">Current Market Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            <FieldArray name="holdings">
                                {({ fields }) => (
                                    <React.Fragment>
                                        {fields.map((holding, index) => (
                                            <tr key={`${holding}.id`} onBlur={() => props.editHolding(values.holdings[index])} >
                                                <Field
                                                    name={`${holding}.name`}
                                                    validate={required}
                                                >
                                                    {({ input, meta }) => (
                                                        <td>
                                                            <input {...input} type="text" className="form-control" />
                                                            {meta.error && meta.touched && <span className="text-danger">{meta.error}</span>}
                                                        </td>
                                                    )}
                                                </Field>
                                                <Field
                                                    name={`${holding}.target`}
                                                    validate={composeValidators(required, mustBeNumber)}
                                                >
                                                    {({ input, meta }) => (
                                                        <td>
                                                            <input {...input} type="text" className="form-control" />
                                                            {meta.error && meta.touched && <span className="text-danger">{meta.error}</span>}
                                                        </td>
                                                    )}
                                                </Field>
                                                <Field
                                                    name={`${holding}.currentPrice`}
                                                    validate={composeValidators(required, mustBeNumber)}
                                                >
                                                    {({ input, meta }) => (
                                                        <td>
                                                            <input {...input} type="text" className="form-control" />
                                                            {meta.error && meta.touched && <span className="text-danger">{meta.error}</span>}
                                                        </td>
                                                    )}
                                                </Field>
                                                <td>
                                                    <i
                                                        className="far fa-trash-alt fa-2x"
                                                        onClick={() => props.deleteHolding(values.holdings[index].id)}>
                                                    </i>
                                                </td>
                                            </tr>
                                        ))}
                                    </React.Fragment>
                                )}

                            </FieldArray>
                        </tbody>
                    </table>
                    <i className="fas fa-plus-circle fa-2x pb-2 d-flex justify-content-center" onClick={props.createHolding}></i>
                    <div className="row g-3">
                        <div className="col-auto">
                            <label htmlFor="contributions" className="col-form-label" style={{fontWeight: 'bold'}}>Planned Contributions:</label>
                        </div>
                        <Field
                            name="contributions"
                            id="contributions"
                            validate={composeValidators(required, mustBeNumber)}
                        >
                            {({ input, meta }) => (
                                <div className="col-auto">
                                    <input {...input} type="text" className="form-control" onBlur={() => props.editContribution(values.contributions)} />
                                    {meta.error && meta.touched && <span className="text-danger">{meta.error}</span>}
                                </div>
                            )}
                        </Field>
                    </div>
                    <button className="btn btn-primary">Calculate</button>
                </form>
            )}
        />
    );
};

const mapStateToProps = (state) => {
    return {
        holdings: state.data.holdings,
        contributions: state.data.contributions
    };
};

export default connect(mapStateToProps, { createHolding, editHolding, deleteHolding, editContribution, editResults })(InputForm);