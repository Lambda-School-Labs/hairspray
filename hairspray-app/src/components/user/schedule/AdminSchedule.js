import React, { Component } from "react";
import { connect } from "react-redux";
import Calendar from "react-calendar";
import { getAppointmentsByDate } from "../../../actions";
import AppointmentList from "./AppointmentList";
import UserHome from "../UserHome";
// import PropTypes from "prop-types";
import {
    Button,
    Form,
    FormGroup,
    Input,
    Dropdown,
    DropdownToggle,
    DropdownMenu
} from "reactstrap";
// import "./AdminSchedule.css";

class AdminSchedule extends Component {
    constructor(props) {
        super(props);
        this.date = "";
    }

    onChange = (date) => {
        this.date = date.toISOString().slice(0, 10);
        this.props.getAppointmentsByDate(this.date);
    }

    render() {
        return (
            <div className="scheduling">
                <div className="scheduling__title">Schedule</div>
                <div className="scheduling__form-container">
                    {/* <Form className="scheduling__form"> */}
                    <div className="side-nav-bar">
                        <UserHome />
                    </div>
                    <FormGroup>
                        {/* TODO: move to the right a little bit */}
                        <Calendar
                            onChange={value => this.onChange(value)}
                        />
                        {/* TODO: Remove this one */}
                        <Form className="scheduling__form">
                            {/* <div className="appointment__container"> */}
                            <div>1st render</div>
                            {this.props.appointments.appt && this.props.appointments.appt.map((appointment, item) => <AppointmentList
                                key={item}
                                session={this.date}
                                stylist={appointment.stylist.name}
                                client={appointment.user.name}
                                time={appointment.service[0].type}
                            />)}
                            {/* </div> */}
                        </Form>
                    </FormGroup>
                    {/* </Form> */}
                    <FormGroup>
                        <Form className="scheduling__form">
                            {/* <div className="appointment__container"> */}
                            <div>2nd render</div>
                            {this.props.appointments.appt && this.props.appointments.appt.map((appointment, item) => <AppointmentList
                                key={item}
                                session={appointment.session}
                                stylist={appointment.stylist.name}
                                client={appointment.user.name}
                                time={appointment.service[0].type}
                            />)}
                            {/* </div> */}
                        </Form>
                    </FormGroup>

                </div>
            </div>
        );
    }
}



// AdminSchedule.propTypes = {
//     appointments: PropTypes.arrayOf(PropTypes.object).isRequired,
//     gettingAppointmentsByDate: PropTypes.bool.isRequired,
// };

const mapStateToProps = (state) => {
    return {
        appointments: state.appt.appointments,
        gettingAppointmentsByDate: state.appt.gettingAppointmentsByDate
    }
}

export default connect(
    mapStateToProps,
    { getAppointmentsByDate }
)(AdminSchedule);