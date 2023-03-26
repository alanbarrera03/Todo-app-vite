import html from './app.html?raw';
import todoStore, { Filters } from '../store/todo.store';
import { renderTodos, renderPending } from './use-cases';

const ElementIds = {

    ClearCompleteButton: '.clear-completed',
    NewTodoInput:        '#new-todo-input',
    PendingCountLabel:   '#pending-count',
    TodoFilters:         '.filtro',
    TodoList:            '.todo-list',

}

/**
 * 
 * @param { String } elementId 
 */

export const App = ( elementId) => {

    const displayTodos = () => {

        const todos = todoStore.getTodos( todoStore.getCurrentFilter() );

        renderTodos( ElementIds.TodoList, todos );

        updatePendingCount();

    }

    const updatePendingCount = () => {

        renderPending( ElementIds.PendingCountLabel );

    }

    ( () => {

        const app = document.createElement( 'div' );

        app.innerHTML = html;

        document.querySelector( elementId ).append( app );

        displayTodos(  );

    } )();

    // Referencias HTML
    const newDescriptionInput = document.querySelector( ElementIds.NewTodoInput );
    const TodoListUL          = document.querySelector( ElementIds.TodoList );
    const clearCompleteButton = document.querySelector( ElementIds.ClearCompleteButton );
    const filtersLIs          = document.querySelectorAll( ElementIds.TodoFilters );

    //Listeners
    newDescriptionInput.addEventListener( 'keyup', ( event ) => {

        if ( event.keyCode !== 13 ) return;

        if ( event.target.value.trim().length === 0 ) return;

        todoStore.addTodo( event.target.value );

        displayTodos();

        event.target.value = '';

        // console.log( event );

    } );

    TodoListUL.addEventListener( 'click', ( event ) => {

        const element = event.target.closest( '[data-id]' );

        todoStore.toggleTodo( element.getAttribute( 'data-id' ) );

        displayTodos();

        // console.log( event.target );

    } );

    TodoListUL.addEventListener( 'click', ( event ) => {

        const isDestroyElement = event.target.className === 'destroy';

        const element = event.target.closest( '[data-id]' );

        if ( !element || !isDestroyElement  ) return;

        todoStore.deleteTodo( element.getAttribute( 'data-id' ) );

        displayTodos();

        // console.log( event.target );
        // const element = event.target.closest()

    } );

    clearCompleteButton.addEventListener( 'click', () => {

        todoStore.deleteCompleted();

        displayTodos();

    } );

    // str_json = JSON.parse(array);

    filtersLIs.forEach( element => {

        element.addEventListener( 'click', ( element ) => {

            filtersLIs.forEach( el => el.classList.remove( 'selected' ) );

            element.target.classList.add( 'selected' );

            switch ( element.target.text ) {
                case 'Todos':

                    todoStore.setFilter( Filters.All );
                    
                    break;

                case 'Pendientes':

                    todoStore.setFilter( Filters.Pending );

                    break;

                case 'Completados':

                    todoStore.setFilter( Filters.Completed );

                    break;

            }

            displayTodos();

        } );
        
    });

    // filtersLIs.forEach( element => {

    //     element.addEventListener( 'click', ( element ) => {

    //         filtersLIs.forEach( el => el.classList.remove( 'selected' ) );

    //         element.target.classList.add( 'selected' );

    //         switch ( element.target.text ) {
    //             case 'Todos':

    //                 todoStore.setFilter( Filters.All );
                    
    //                 break;

    //             case 'Pendientes':

    //                 todoStore.setFilter( Filters.Pending );

    //                 break;

    //             case 'Completados':

    //                 todoStore.setFilter( Filters.Completed );

    //                 break;

    //         }

    //         displayTodos();

    //     } );

    // } );

}