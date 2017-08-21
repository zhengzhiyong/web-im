import React from "react"
import PropTypes from "prop-types"
import {connect} from "react-redux"
import {Button, Row, Form, Input} from "antd"
import {config} from "@/config"
import styles from "./index.less"
import LoginActions from "@/redux/LoginRedux"
import WebIM from "@/config/WebIM"

const FormItem = Form.Item

const Signup = ({
                    login,
                    doLogin,
                    toSignin,
                    form: {getFieldDecorator, validateFieldsAndScroll}
                }) => {
    // close connection
    if (WebIM.conn.isOpened()) {
        WebIM.conn.close("logout")
    }

    const {loginLoading} = login

    function handleOk() {
        validateFieldsAndScroll((errors, values) => {
            if (errors) {
                return
            }
            console.log(values)
            // dispatch({ type: "login/login", payload: values })
            doLogin(values.username, values.password)
        })
    }

    //
    return (
        <div className="form x-login">
            <div className="logo">
                <i className="iconfont icon-hyphenate"/>
                <span>
					{config.name}
				</span>
            </div>
            <form>
                <FormItem hasFeedback>
                    {getFieldDecorator("username", {
                        rules: [
                            {
                                required: true
                            }
                        ]
                    })(
                        <Input
                            size="large"
                            onPressEnter={handleOk}
                            placeholder="Username"
                        />
                    )}
                </FormItem>
                <FormItem hasFeedback>
                    {getFieldDecorator("password", {
                        rules: [
                            {
                                required: true
                            }
                        ]
                    })(
                        <Input
                            size="large"
                            type="password"
                            onPressEnter={handleOk}
                            placeholder="Password"
                        />
                    )}
                </FormItem>
                <Row>
                    <Button
                        type="primary"
                        size="large"
                        onClick={handleOk}
                        loading={loginLoading}
                    >
                        Sign up
                    </Button>
                </Row>
            </form>
            <div className="extra">
                <p>
                    Have an account?
                    <span onClick={toSignin}>Sign In</span>
                </p>
            </div>
        </div>
    )
}


Signup.propTypes = {
    form: PropTypes.object,
    login: PropTypes.object,
    dispatch: PropTypes.func
}

export default    connect(
    ({login}) => ({
        login: {
            loginLoading: false
        }
    }),
    dispatch => ({
        doLogin: (username, password) =>
            dispatch(LoginActions.login(username, password)),
        toSignin: () =>
            dispatch(LoginActions.signin())
    })
)(Form.create()(Signup))
