var vue = new Vue({
    el: "#app",
    data: {
        showSuccess: false,
        showError: false,
        showDetails: false,
        details: [],
        successMessage: '',
        errorMessage: '',
        ram: '10000',
        hostCpu: '8',
        storage: '100000',
        bandwidth: '10000',
        vms: [
            {
                ram: '1000',
                cpuCore: '1',
                size: '2000',
                bandwidth: '1000',
                workLoad: '1000'
            }
        ]
    },
    methods: {

        addMoreVm(e){
            this.vms.push({
                ram: '1000',
                cpuCore: '1',
                size: '2000',
                bandwidth: '1000',
                workLoad: '1000'
            });
        },

        deleteRecord(index){
          console.log(`About to delete record in index ${index}`);
          this.vms.splice(index, 1);
        },

        hideSuccess(){
            this.showSuccess = false;
        },

        hideError(){
            this.showError = false;
        },

        hideShowDetails(){
            this.showDetails = false;
        },

        startSimulation(e){
            this.showSuccess = false;
            this.showError = false;
            this.showDetails = false;

            let url = 'http://localhost:8088/api/create-vms';

            let requestBody = {
                host: {
                    ram: this.ram,
                    cpu: this.hostCpu,
                    storage: this.storage,
                    bandwidth: this.bandwidth
                },
                vmList: this.vms
            };

            var httpHeaders = { 'Content-Type' : 'application/json', 'Accept-Charset' : 'utf-8', 'X-My-Custom-Header' : 'Godson' };
            var myHeaders = new Headers(httpHeaders);

            fetch(url,{
                method: 'POST',
                headers: myHeaders,
                body: JSON.stringify(requestBody)
            })
            .then(res => {
                return res.json()
            })
            .then(data => {
                if(parseInt(data.createdVm) > 0){
                    this.showSuccess = true;
                    this.successMessage = `${data.createdVm} VM created successfully`;
                }

                if(parseInt(data.failedVm) > 0){
                    this.showError = true;
                    this.errorMessage = `${data.failedVm} VM failed`;
                }
                this.details = data.details;
                this.showDetails = true;
                
                console.log('Response : ' + JSON.stringify(data))
            }).catch(error => {
                console.error(error)
            })
            
        }
    }
})