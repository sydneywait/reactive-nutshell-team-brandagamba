import React, { Component } from "react";
import "./Notes.css";

export default class NoteList extends Component {
    render() {
        return (
            <form className="noteForm">
                        <h1>Notes</h1>
                <div className="newButton">
                    <button type="button"
                        className="btn btn-secondary"
                        onClick={() => {
                            this.props.history.push("/notes/new")
                        }
                        }>
                        New Note
                    </button>
                </div>
                <section className="notes">
                    {
                        this.props.notes.map(note =>
                            <div key={note.id} className="card">
                                <div className="card-body">
                                    <h5 className="card-title">
                                        <p className="newNote">{note.name}</p>
                                        <button className="card-link btn btn-primary"
                                            onClick={() => {
                                                this.props.history.push(`/notes/${note.id}/edit`);
                                            }}>Edit</button>
                                        <button
                                            type="button"
                                            className="btn btn-danger"
                                            onClick={() => {
                                                this.props.deleteNote(note.id)
                                                this.props.history.push(`/notes`);
                                            }}
                                        >
                                            Delete
</button>


                                    </h5>
                                </div>
                            </div>
                        )
                    }
                </section>
            </form>
        )

    }
}