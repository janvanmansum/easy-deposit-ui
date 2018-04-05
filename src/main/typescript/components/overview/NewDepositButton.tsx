/*
 * Copyright (C) 2018 DANS - Data Archiving and Networked Services (info@dans.knaw.nl)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import * as React from "react"
import { Component } from "react"
import { AppState } from "../../model/AppState"
import { connect } from "react-redux"
import * as H from "history"
import { createNewDeposit } from "../../actions/depositOverviewActions"
import { depositFormRoute } from "../../constants/clientRoutes"
import { ReduxAction } from "../../lib/redux"

interface NewDepositButtonProps {
    creatingNew: boolean
    createNewDeposit: (pushHistory: (id: string) => void) => ReduxAction<Promise<any>>
    history: H.History
}

class NewDepositButton extends Component<NewDepositButtonProps> {
    createNewDeposit = () => {
        const { createNewDeposit, history } = this.props

        createNewDeposit(id => history.push(depositFormRoute(id)))
    }

    render() {
        return (
            <button className="btn btn-dark"
                    disabled={this.props.creatingNew}
                    title="Create new deposit..."
                    onClick={this.createNewDeposit}>{this.props.children}</button>
        )
    }
}

const mapStateToProps = (state: AppState) => ({
    creatingNew: state.deposits.creatingNew.creating,
})

export default connect(mapStateToProps, { createNewDeposit })(NewDepositButton)