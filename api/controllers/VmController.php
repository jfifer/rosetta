<?php
include_once 'AbstractController.php';

class VmController extends AbstractController {
   public function getAction($request) {
     if(isset($request->url_elements[2])) {
       $action = $request->url_elements[2];
       $vm = new VmModel();
       switch($action) {
         case "context" :
           if(isset($request->url_elements[3])) {
             $fs = $request->url_elements[3];
           } else {
             $fs = null;
           }
           $data = $vm->listContexts($fs);
           break;
         case "featureServers" :
           $data = $vm->listFeatureServers();
           break;
         default :
           break;
       }
     } else {
       $data = $this->errorResponse("Did you want to do something?");
     }
     return $data; 
   }

   public function postAction($request) {
     
   }
}
