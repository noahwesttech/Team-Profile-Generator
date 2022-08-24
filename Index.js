const fs = require('fs');
const inquirer = require('inquirer');
const Employee = require('./Dev/work-employees.js');
const Engineer = require('./Dev/Engineer(s).js');
const Intern = require('./Dev/Intern(s).js');
const Manager = require('./Dev/Manager(s).js');
const generateHTML = require('./Dev/team-profile.js');

const profilePrompts = [];
const teamMembers = []

function managerPrompt() {
    inquirer
        .prompt([
            {
                type: 'input',
                message: 'Please enter the name of the team manager.',
                name: 'name',
                validate: (value) => { if (value) { return true } else { return 'Please enter the team manager.' } },
            },
            {
                type: 'input',
                message: 'Please enter the employee ID for the team manager.',
                name: 'employeeID',
                validate: (value) => { if (value) { return true } else { return 'Please enter an employee ID.' } },
            },
            {
                type: 'input',
                message: 'Please enter the email address for the team manager.',
                name: 'managerEmail',
                validate: (value) => { if (value) { return true } else { return 'Please enter the email address for the team manager.' } },
            },
            {
                type: 'input',
                message: 'Please enter the phone number for the team manager.',
                name: 'managerPhone',
                validate: (value) => { if (value) { return true } else { return 'Please enter the phone number for the team manager.' } },
            }]).then((answers) => {
                const { name, employeeID, managerEmail, managerPhone } = answers;
                const manager = new Manager(name, employeeID, managerEmail, managerPhone);
                console.log(manager)
                teamMembers.push(manager)
                employeeChoice();
            })
}

//function to prompt for employee type
function employeeChoice() {
    inquirer
        .prompt([
            {
                type: 'list',
                message: 'What type of employee do you need to add?',
                name: 'employeeType',
                choices: ['Engineer', 'Intern', 'Finish Building My Team'],
                validate: (value) => { if (value) { return true } else { return 'Please select an option.' } },
            }]).then(data => {
                switch (data.employeeType) {
                    case 'Engineer':
                        return engineerChoice();
                    case 'Intern':
                        return internChoice();
                    case 'Finish Building My Team':
                        return quit();
                    default:
                        break;
                }
                console.log(data);
            })
}